


// Chuyển sang Quên Mật Khẩu
function toForgotPassword() {
    loginForm.style.display = "none"; // Ẩn form Đăng Nhập
    registerForm.style.display = "none"; // Ẩn form Đăng Ký
    resetPasswordForm.style.display = "none"; // Ẩn form Đổi Mật Khẩu
    forgotPasswordForm.style.display = "block"; // Hiển thị form Quên Mật Khẩu
}

// Giả lập gửi mã xác thực qua EmailJS
function sendVerificationCode(event) {
    event.preventDefault(); // Ngăn reload trang

    // Lấy email từ form Quên Mật Khẩu
    const email = document.querySelector("#forgot-password input[type='email']").value;

    // Kiểm tra email có hợp lệ không (chỉ là ví dụ đơn giản)
    if (!email.includes("@")) {
        alert("Email không hợp lệ.");
        return;
    }

    // Tạo mã xác thực ngẫu nhiên
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Mã 6 chữ số

    // Lưu mã xác thực vào localStorage (Giả lập việc gửi mã)
    localStorage.setItem("verificationCode", verificationCode);

    // Thực hiện gửi email qua EmailJS
    emailjs.send("service_zx1hi8s", "template_yfqaj1h", {
        to: email, // Email người nhận
        verificationCode: verificationCode, // Mã xác thực
    })
    .then(function(response) {
        alert("Mã xác thực đã được gửi đến email của bạn!");
        toResetPassword(); // Chuyển sang form Đổi Mật Khẩu
    }, function(error) {
        alert("Lỗi gửi email: " + error.text);
    });
}

// Lấy các phần tử cần thiết
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const forgotPasswordForm = document.getElementById("forgot-password");
const resetPasswordForm = document.getElementById("reset-password");

// Chuyển sang Đăng Nhập
function toLogin() {
    registerForm.style.display = "none"; // Ẩn form Đăng Ký
    forgotPasswordForm.style.display = "none"; // Ẩn form Quên Mật Khẩu
    resetPasswordForm.style.display = "none"; // Ẩn form Đổi Mật Khẩu
    loginForm.style.display = "block";  // Hiển thị form Đăng Nhập
}

// Kiểm tra thông tin đăng nhập và chuyển sang trang mới nếu thành công
function loginUser(event) {
    event.preventDefault(); // Ngăn reload trang

    const username = document.querySelector("#login input[type='text']").value;
    const password = document.querySelector("#login input[type='password']").value;

    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
        alert("Đăng nhập thành công!");
        window.location.href = "./Nro.html"; // Đảm bảo đường dẫn chính xác
    } else {
        alert("Tài khoản hoặc mật khẩu không đúng!");
    }
}

// Chuyển sang Đăng Ký
function toRegister() {
    loginForm.style.display = "none";   // Ẩn form Đăng Nhập
    registerForm.style.display = "block"; // Hiển thị form Đăng Ký
}

// Lấy thông tin từ form Đăng Ký và lưu vào LocalStorage
function registerUser(event) {
    event.preventDefault(); // Ngăn reload trang

    const username = document.querySelector("#register input[type='text']").value;
    const password = document.querySelector("#register input[type='password']").value;

    const existingUser = localStorage.getItem(username);
    if (existingUser) {
        alert("Tài khoản đã tồn tại. Vui lòng chọn tên tài khoản khác.");
        return;
    }

    localStorage.setItem(username, password);
    alert("Đăng ký thành công! Hãy đăng nhập bằng tài khoản của bạn.");
    toLogin(); // Chuyển sang form Đăng Nhập
}

// Gắn sự kiện cho các nút
document.querySelector("#login").addEventListener("submit", loginUser);
document.querySelector("#register").addEventListener("submit", registerUser);
document.querySelector("#forgot-password").addEventListener("submit", sendVerificationCode);
document.querySelector("#reset-password").addEventListener("submit", resetPassword);

// Đảm bảo rằng form Đăng Nhập được hiển thị mặc định khi tải trang
window.onload = () => {
    loginForm.style.display = "block"; // Hiển thị form Đăng Nhập
    registerForm.style.display = "none"; // Ẩn form Đăng Ký
    forgotPasswordForm.style.display = "none"; // Ẩn form Quên Mật Khẩu
    resetPasswordForm.style.display = "none"; // Ẩn form Đổi Mật Khẩu
};
document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordForm = document.querySelector("#forgot-password");
    forgotPasswordForm.addEventListener("submit", sendVerificationCode);
});
