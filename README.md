# AgentFlow

AgentFlow là trợ lý lập trình AI chạy cục bộ, được thiết kế để xử lý các nhiệm vụ phát triển phần mềm nhiều bước. Hệ thống kết hợp nghiên cứu mã nguồn, lập kế hoạch, triển khai, chạy lệnh và ghi nhớ ngữ cảnh dự án trong một quy trình thống nhất.

> AgentFlow có thể thực thi lệnh và thay đổi tệp. Chỉ nên chạy trong repository có Git, không đặt bí mật trong prompt và luôn kiểm tra diff trước khi commit.

## Demo

Flow minh họa hoàn chỉnh trên project Calculator:

1. **Research** đọc mã nguồn và test, sau đó ghi lại research notes.
2. **Planning** tạo kế hoạch thay đổi tối thiểu.
3. **Implementation** cài đặt hàm `add(left, right)`.
4. **Verification** chạy `pytest -q` và hoàn tất với kết quả `2 passed`.

### Giao diện máy tính

![AgentFlow trên máy tính](docs/demo/agentflow-dashboard.png)

### Giao diện di động

<img src="docs/demo/agentflow-mobile.png" alt="AgentFlow trên di động" width="390">

## Tính năng

- Quy trình ba giai đoạn: nghiên cứu, lập kế hoạch và triển khai.
- Chế độ CLI một lần, hội thoại tương tác và Web UI.
- Hỗ trợ Anthropic, OpenAI, Gemini, DeepSeek, OpenRouter, Ollama và endpoint tương thích OpenAI.
- Bộ công cụ đọc/ghi tệp, tìm kiếm mã, thực thi shell, nghiên cứu web và MCP.
- Lưu phiên, tiến trình và bộ nhớ dự án trong `.agentflow/`.
- Chế độ human-in-the-loop cho các bước cần xác nhận.

## Kiến trúc

```text
AgentFlow/
├── agentflow/          # Backend Python, agent, tool, API và database
│   ├── agents/         # Nghiên cứu, lập kế hoạch, triển khai
│   ├── tools/          # Công cụ của agent
│   ├── prompts/        # Prompt theo từng luồng
│   ├── database/       # Model, repository và migration SQLite
│   └── server/         # FastAPI, WebSocket và Web UI đóng gói
├── frontend/
│   ├── common/         # Component React dùng chung
│   ├── web/            # Ứng dụng Vite
│   └── vsc/            # Extension VS Code
├── tests/              # Kiểm thử tự động
├── docs/               # Docusaurus và OpenAPI
└── examples/           # Ví dụ tích hợp
```

## Yêu cầu

- Python 3.10 trở lên
- Node.js 18 trở lên khi phát triển giao diện
- `git`, `ripgrep` và một khóa API của nhà cung cấp LLM
- Khuyến nghị dùng `uv` để quản lý môi trường Python

## Cài đặt

```bash
git clone <repository-url>
cd AgentFlow
uv sync --extra dev
```

Không dùng `uv`:

```bash
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
```

## Cấu hình

Thiết lập ít nhất một nhà cung cấp:

```bash
export ANTHROPIC_API_KEY="..."
# hoặc OPENAI_API_KEY, GEMINI_API_KEY, DEEPSEEK_API_KEY,
# OPENROUTER_API_KEY, GROQ_API_KEY, FIREWORKS_API_KEY
```

Tính năng nghiên cứu web cần thêm `TAVILY_API_KEY`. Không commit khóa API; hãy dùng biến môi trường hoặc kho bí mật của CI/CD.

## Sử dụng

```bash
# Chạy một nhiệm vụ
agentflow -m "Phân tích dự án và bổ sung kiểm thử cho module thanh toán"

# Chỉ nghiên cứu, không sửa mã
agentflow -m "Giải thích luồng xác thực" --research-only

# Chế độ hội thoại
agentflow --chat

# Giao diện web
agentflow --server --server-host 127.0.0.1 --server-port 8000
```

Truy cập `http://127.0.0.1:8000` sau khi server khởi động. Dùng `agentflow --help` để xem toàn bộ tùy chọn.

## Phát triển

```bash
# Test backend
uv run pytest

# Chạy Web UI
cd frontend
npm install
npm run dev:web

# Build Web UI và nhúng vào backend
npm run build:prebuilt
```

Khi thay đổi database, tạo migration mới thay vì sửa migration đã phát hành.

## Dữ liệu cục bộ

AgentFlow tạo `.agentflow/` trong dự án đang làm việc. Thư mục này chứa SQLite, log và trạng thái phiên; không nên commit lên Git. Có thể chỉ định vị trí khác bằng `--project-state-dir`.

## Đóng góp

1. Tạo nhánh tính năng từ nhánh chính.
2. Viết hoặc cập nhật test cho thay đổi.
3. Chạy test backend và build frontend.
4. Mô tả hành vi, rủi ro và cách kiểm thử trong pull request.

## Giấy phép

AgentFlow được phát hành theo Apache License 2.0. Xem tệp `LICENSE` để biết điều khoản chi tiết.
