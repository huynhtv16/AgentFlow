# Bản đồ mã nguồn để học tập

Dự án hiện tại dựa trên AgentFlow. Tài liệu này là phần bổ sung phục vụ việc
đọc mã nguồn và phát triển bản tùy biến cá nhân. Thông tin nguồn gốc nằm
trong `README.md`, thông tin tác giả trong `pyproject.toml` và giấy phép
trong `LICENSE`.

## Các phần chính

| Thành phần | Nơi đọc | Vai trò |
| --- | --- | --- |
| Điểm vào CLI | `agentflow/__main__.py` | Nhận tham số và khởi động chương trình |
| Khởi tạo mô hình | `agentflow/llm.py` | Kết nối các nhà cung cấp mô hình |
| Các giai đoạn xử lý | `agentflow/agents/` | Nghiên cứu, lập kế hoạch, triển khai |
| Backend CIAYN | `agentflow/agent_backends/ciayn_agent.py` | Xử lý phản hồi mô hình và lời gọi công cụ bằng Python |
| Chỉ dẫn cho mô hình | `agentflow/prompts/` | Prompt theo từng nhiệm vụ |
| Công cụ | `agentflow/tools/`, `agentflow/tool_configs.py` | Đọc, sửa file, chạy shell, lưu ghi chú và chuyển nhiệm vụ |
| Dữ liệu | `agentflow/database/` | Lưu phiên làm việc và dữ liệu bằng Peewee/SQLite |
| API và WebSocket | `agentflow/server/` | Kết nối giao diện với backend |
| Giao diện dùng chung | `frontend/common/` | Component React và tiện ích kết nối |
| Ứng dụng web | `frontend/web/` | Chạy giao diện bằng Vite |
| Extension VS Code | `frontend/vsc/` | Tích hợp giao diện vào trình soạn thảo |
| Trang tài liệu | `docs/` | Tài liệu xây dựng bằng Docusaurus |

## Thứ tự đọc gợi ý

1. Đọc `pyproject.toml` để biết dependency và cách lệnh `agentflow` trỏ tới
   `agentflow.__main__:main`.
2. Đọc `main()` trong `agentflow/__main__.py`, sau đó lần theo nhánh xử lý
   tương ứng với chế độ bạn muốn học.
3. Đọc `agentflow/agents/research_agent.py`, `planning_agent.py` và
   `implementation_agent.py` để hiểu cách các giai đoạn sử dụng prompt và tool.
4. Đọc backend CIAYN theo hướng dẫn bên dưới.
5. Chọn một tool đơn giản trong `agentflow/tools/`, lần theo nơi đăng ký tool
   trong `agentflow/tool_configs.py` và cách kết quả quay về agent.
6. Đọc các bài kiểm thử liên quan trong `tests/` trước khi thay đổi hành vi.

## Đọc file `ciayn_agent.py`

- `validate_function_call_pattern()` dùng AST để kiểm tra cấu trúc lời gọi.
  Chú ý: hàm trả về `False` khi hợp lệ và `True` khi không hợp lệ.
- `CiaynAgent.__init__()` nhận mô hình, công cụ, cấu hình và giới hạn lịch sử.
- `_build_prompt()` chuẩn bị prompt; `strip_code_markup()` xử lý phần mã
  được bọc trong Markdown.
- `_detect_multiple_tool_calls()` xử lý tình huống phản hồi chứa nhiều lời gọi.
- `_execute_tool()` xử lý lời gọi công cụ và kết quả. Hàm có sử dụng `eval()`;
  kiểm tra AST về cú pháp không đồng nghĩa với cô lập việc thực thi mã.
- `handle_fallback_response()` xử lý phản hồi theo đường dự phòng.
- `_trim_chat_history()` và `_estimate_tokens()` quản lý kích thước ngữ cảnh.
- `stream()` là điểm đọc chính để hiểu vòng lặp tương tác với mô hình.

Bài tập đầu tiên: lần theo một lời gọi đọc file từ phản hồi của mô hình,
qua `_execute_tool()`, đến kết quả được đưa vào lịch sử hội thoại.

## Những phần cần đồng bộ khi cá nhân hóa

Tên hiển thị xuất hiện trong README, HTML, component React, metadata extension,
CLI và cấu hình trang tài liệu. Tên kỹ thuật còn xuất hiện trong import Python,
entry point, workspace npm, test, lockfile và script build. Cần quyết định phạm
vi đổi tên trước khi sửa đồng loạt.

`agentflow/server/prebuilt/` và `frontend/vsc/dist/` chứa sản phẩm build sẵn.
Khi thay đổi giao diện hoặc extension, cần build lại từ mã nguồn tương ứng.

Bản cá nhân nên có tên riêng và mô tả rõ phần tùy biến để học tập, đồng thời
giữ thông tin nguồn gốc và giấy phép hiện có. Các đường dẫn kho mã, website
và nơi báo lỗi cần dùng địa chỉ thực của bản cá nhân khi đã có.
