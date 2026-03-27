#!/usr/bin/env bash
set -euo pipefail

# ── Config ──────────────────────────────────────────────────────────────
APP_PORT="${APP_PORT:-8080}"
LOG_DIR="${LOG_DIR:-./logs}"
LOG_FILE="${LOG_DIR}/frontend.log"
TOTAL_STEPS=4
START_TIME=$(date +%s)

# Prefer explicit host; fallback to first local IP; then localhost
PUBLIC_HOST="${PUBLIC_HOST:-$(hostname -I 2>/dev/null | awk '{print $1}')}"
PUBLIC_HOST="${PUBLIC_HOST:-127.0.0.1}"

# ── Colors & Styles ─────────────────────────────────────────────────────
R='\033[0m'         # Reset
BOLD='\033[1m'
DIM='\033[2m'
ITALIC='\033[3m'

WHITE='\033[97m'
RED='\033[91m'
GREEN='\033[92m'
YELLOW='\033[93m'
CYAN='\033[96m'

# 256-color gradient (violet -> cyan)
P1='\033[38;5;57m'
P2='\033[38;5;63m'
P3='\033[38;5;69m'
P4='\033[38;5;75m'
P5='\033[38;5;81m'
P6='\033[38;5;87m'

# ── Helpers ─────────────────────────────────────────────────────────────
info()  { echo -e "  ${GREEN}${BOLD}✓${R}  $1"; }
warn()  { echo -e "  ${YELLOW}${BOLD}!${R}  $1"; }
err()   { echo -e "  ${RED}${BOLD}✗${R}  $1"; }
dim()   { echo -e "  ${DIM}$1${R}"; }

bar() {
  echo -e "  ${DIM}$(printf '%.0s─' {1..56})${R}"
}

step() {
  local idx="$1" label="$2"
  echo ""
  echo -e "  ${P2}${BOLD}▸ Step ${idx}/${TOTAL_STEPS}${R}  ${WHITE}${BOLD}${label}${R}"
  bar
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    err "缺少命令: $1"
    exit 1
  }
}

print_banner() {
  clear
  echo ""
  echo -e "${P1}${BOLD}    ██████╗ ███████╗ █████╗ ███╗   ██╗${R}"
  echo -e "${P2}${BOLD}    ██╔══██╗██╔════╝██╔══██╗████╗  ██║${R}"
  echo -e "${P3}${BOLD}    ██║  ██║█████╗  ███████║██╔██╗ ██║${R}"
  echo -e "${P4}${BOLD}    ██║  ██║██╔══╝  ██╔══██║██║╚██╗██║${R}"
  echo -e "${P5}${BOLD}    ██████╔╝███████╗██║  ██║██║ ╚████║${R}"
  echo -e "${P6}${BOLD}    ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝${R}"
  echo ""
  echo -e "  ${P3}$(printf '%.0s═' {1..56})${R}"
  echo -e "  ${P2}${BOLD}院长智能体${R} ${DIM}·${R} ${ITALIC}${DIM}Dean AI Agent — Frontend Deploy${R}"
  echo -e "  ${P3}$(printf '%.0s═' {1..56})${R}"
  echo ""

  local _branch _node _npm _time
  _branch=$(git branch --show-current 2>/dev/null || echo 'unknown')
  _node=$(node -v 2>/dev/null || echo 'N/A')
  _npm=$(npm -v 2>/dev/null || echo 'N/A')
  _time=$(date '+%Y-%m-%d  %H:%M:%S')

  echo -e "  ${DIM}TIME${R}   ${WHITE}${_time}${R}    ${DIM}PORT${R}  ${CYAN}${BOLD}:${APP_PORT}${R}"
  echo -e "  ${DIM}BRANCH${R} ${YELLOW}${_branch}${R}          ${DIM}NODE${R}  ${GREEN}${_node}${R}"
  echo -e "  ${DIM}NPM${R}    ${GREEN}${_npm}${R}          ${DIM}TARGET${R} ${DIM}${PUBLIC_HOST}${R}"
  echo ""
}

# ── Preflight ───────────────────────────────────────────────────────────
require_cmd git
require_cmd node
require_cmd npm
require_cmd ss
require_cmd sed
require_cmd awk

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  err "当前目录不是 git 仓库"
  exit 1
fi

mkdir -p "$LOG_DIR"

print_banner

# ── Step 1: Git Pull ────────────────────────────────────────────────────
step 1 "Git Pull"

BEFORE_SHA="$(git rev-parse HEAD 2>/dev/null || true)"

git pull --ff-only >/dev/null 2>&1 && info "代码同步完成" \
  || { err "git pull 失败 — 请检查未提交更改或网络"; exit 1; }

AFTER_SHA="$(git rev-parse HEAD 2>/dev/null || true)"
COMMITS_PULLED=0

if [[ -n "$BEFORE_SHA" && -n "$AFTER_SHA" && "$BEFORE_SHA" != "$AFTER_SHA" ]]; then
  COMMITS_PULLED="$(git rev-list --count "${BEFORE_SHA}..${AFTER_SHA}" 2>/dev/null || echo 0)"
  echo ""
  dim "  拉取了 ${WHITE}${BOLD}${COMMITS_PULLED}${R}${DIM} 个新提交:"
  git log --oneline "${BEFORE_SHA}..${AFTER_SHA}" 2>/dev/null | head -6 | while IFS= read -r line; do
    echo -e "    ${P4}›${R} ${DIM}${line}${R}"
  done
else
  dim "  Already up to date."
fi

# ── Step 2: Dependency Check ────────────────────────────────────────────
step 2 "依赖检测"

NEED_INSTALL=false

if [[ ! -d "node_modules" ]]; then
  NEED_INSTALL=true
  warn "node_modules 目录不存在"
fi

if [[ ! -f "package-lock.json" ]]; then
  NEED_INSTALL=true
  warn "package-lock.json 不存在"
fi

if [[ "${COMMITS_PULLED}" -gt 0 ]]; then
  if git diff --name-only "${BEFORE_SHA}..${AFTER_SHA}" 2>/dev/null | grep -qE '^package(-lock)?\.json$'; then
    NEED_INSTALL=true
    warn "检测到 package.json / package-lock.json 变更"
  fi
fi

if [[ "$NEED_INSTALL" == true ]]; then
  info "安装依赖 (--legacy-peer-deps)..."
  npm install --legacy-peer-deps
  info "依赖安装完成"
else
  info "依赖无变化，跳过安装"
fi

# ── Step 3: Build ───────────────────────────────────────────────────────
step 3 "生产构建"

BUILD_START=$(date +%s)
npm run build || { err "构建失败 — 请检查编译错误"; exit 1; }
BUILD_END=$(date +%s)
BUILD_DURATION=$((BUILD_END - BUILD_START))
info "构建完成 ${DIM}(${BUILD_DURATION}s)${R}"

# ── Step 4: Restart Service ─────────────────────────────────────────────
step 4 "启动服务"

OLD_PIDS="$(ss -tlnp "sport = :${APP_PORT}" 2>/dev/null | sed -n 's/.*pid=\([0-9]*\).*/\1/p' | sort -u | tr '\n' ' ')"

if [[ -n "${OLD_PIDS// /}" ]]; then
  warn "停止旧进程 (PID: ${YELLOW}${OLD_PIDS}${R})"
  for pid in $OLD_PIDS; do
    kill "$pid" 2>/dev/null || true
  done
  sleep 2
  for pid in $OLD_PIDS; do
    kill -0 "$pid" 2>/dev/null && kill -9 "$pid" 2>/dev/null || true
  done
  sleep 1
fi

nohup npm run start -- --port "$APP_PORT" --hostname 0.0.0.0 > "$LOG_FILE" 2>&1 &
NEW_PID=$!

sleep 2
if ! kill -0 "$NEW_PID" 2>/dev/null; then
  err "服务启动失败，请检查日志:"
  tail -20 "$LOG_FILE" 2>/dev/null || true
  exit 1
fi

# Optional: lightweight health wait (up to 20s)
READY=false
for _ in $(seq 1 20); do
  if curl -sf "http://127.0.0.1:${APP_PORT}" >/dev/null 2>&1; then
    READY=true
    break
  fi
  sleep 1
done

if [[ "$READY" == true ]]; then
  info "服务已启动 ${DIM}PID ${WHITE}${NEW_PID}${R}"
else
  warn "进程已启动，但首页健康检查超时（可继续观察日志）"
  info "服务进程 PID ${WHITE}${NEW_PID}${R}"
fi

# ── Report ──────────────────────────────────────────────────────────────
END_TIME=$(date +%s)
TOTAL_DURATION=$((END_TIME - START_TIME))

echo ""
echo -e "  ${P3}$(printf '%.0s═' {1..56})${R}"
printf "  ${P5}${BOLD}✦  DEPLOY COMPLETE${R}"
echo -e "  ${DIM}耗时 ${WHITE}${TOTAL_DURATION}s${R}"
echo -e "  ${P3}$(printf '%.0s═' {1..56})${R}"
echo ""
echo -e "  ${DIM}URL${R}    ${CYAN}${BOLD}http://${PUBLIC_HOST}:${APP_PORT}${R}"
echo -e "  ${DIM}Local${R}  ${CYAN}http://127.0.0.1:${APP_PORT}${R}"
echo -e "  ${DIM}PID${R}    ${WHITE}${NEW_PID}${R}"
echo -e "  ${DIM}LOG${R}    ${DIM}tail -f ${LOG_FILE}${R}"
echo ""
