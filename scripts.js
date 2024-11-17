


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
    const text =  document.querySelector("#forgot-password input[type='text']").value;
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
        username: "SangTTL",
        name: text,
        to_email: email,    
        verificationCode: verificationCode,  // Mã xác thực
        
    })
    .then(function(response) {
        alert("Mã xác thực đã được gửi đến email của bạn!");
        console.log("Mã xác thực là:", verificationCode);
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

    const usernameOrEmail = document.querySelector('input[name="usernameOrEmail"]').value; // Lấy giá trị username/email
    const password = document.querySelector("#login input[type='password']").value; // Lấy giá trị mật khẩu

    // Kiểm tra xem có thông tin người dùng trong localStorage theo username hoặc email không
    const storedUser = localStorage.getItem(usernameOrEmail);  // Lấy dữ liệu từ localStorage theo username/email

    if (storedUser) {
        const userData = JSON.parse(storedUser); // Chuyển đổi dữ liệu từ JSON

        // Kiểm tra mật khẩu
        if (userData.password === password) {
            alert("Đăng nhập thành công!");
            window.location.href = "./Nro.html"; // Đảm bảo đường dẫn chính xác
        } else {
            alert("Mật khẩu không đúng!");
        }
    } else {
        alert("Tài khoản hoặc email không tồn tại!");
    }
}
function loginUser(event) {
    event.preventDefault(); // Ngăn reload trang

    const usernameOrEmail = document.querySelector('input[name="usernameOrEmail"]').value; // Lấy giá trị username/email
    const password = document.querySelector("#login input[type='password']").value; // Lấy giá trị mật khẩu

    // Kiểm tra xem có thông tin người dùng trong localStorage theo username hoặc email không
    const storedUser = localStorage.getItem(usernameOrEmail);  // Lấy dữ liệu từ localStorage theo username/email

    if (storedUser) {
        const userData = JSON.parse(storedUser); // Chuyển đổi dữ liệu từ JSON

        // Kiểm tra thời gian đăng ký
        const registrationTime = userData.registrationTime;
        const currentTime = Date.now();
        const timeDifference = currentTime - registrationTime; // Chênh lệch thời gian
        const daysDifference = timeDifference / (1000 * 3600 * 24); // Tính số ngày

        if (daysDifference > 30) {
            // Nếu tài khoản đã tồn tại hơn 30 ngày, xóa tài khoản
            alert("Tài khoản của bạn đã bị xóa vì không hoạt động trong 30 ngày.");
            localStorage.removeItem(usernameOrEmail);  // Xóa tài khoản khỏi localStorage
            return;
        }

        // Kiểm tra mật khẩu
        if (userData.password === password) {
            alert("Đăng nhập thành công!");
            window.location.href = "./Nro.html"; // Đảm bảo đường dẫn chính xác
        } else {
            alert("Mật khẩu không đúng!");
        }
    } else {
        alert("Tài khoản hoặc email không tồn tại!");
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
    const email = document.querySelector("#register input[type='email']").value;
    const password = document.querySelector("#register input[type='password']").value;

    const existingUser = localStorage.getItem(username); // Kiểm tra tài khoản tồn tại
    if (existingUser) {
        alert("Tài khoản đã tồn tại. Vui lòng chọn tên tài khoản khác.");
        return;
    }
    const existingUserByEmail = localStorage.getItem(email); // Kiểm tra email đã được đăng ký chưa
    if (existingUserByEmail) {
        alert("Email này đã được đăng ký cho tài khoản khác.");
        return;
    }

    // Lưu thông tin đăng ký vào localStorage
    const userData = { username, email, password, registrationTime: Date.now() }; // Lưu thời gian đăng ký
    localStorage.setItem(username, JSON.stringify(userData)); // Lưu theo tên tài khoản
    localStorage.setItem(email, JSON.stringify(userData)); // Lưu theo email

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
    // Kiểm tra và xóa tài khoản nếu quá 30 ngày
    const storedUsers = Object.keys(localStorage);
    storedUsers.forEach(usernameOrEmail => {
        const storedUser = localStorage.getItem(usernameOrEmail);
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            const registrationTime = userData.registrationTime;
            const currentTime = Date.now();
            const timeDifference = currentTime - registrationTime;
            const daysDifference = timeDifference / (1000 * 3600 * 24);

            if (daysDifference > 30) {
                // Xóa tài khoản nếu quá 30 ngày
                localStorage.removeItem(usernameOrEmail);
            }
        }
    });

    // Hiển thị form Đăng Nhập mặc định
    loginForm.style.display = "block"; // Hiển thị form Đăng Nhập
    registerForm.style.display = "none"; // Ẩn form Đăng Ký
    forgotPasswordForm.style.display = "none"; // Ẩn form Quên Mật Khẩu
    resetPasswordForm.style.display = "none"; // Ẩn form Đổi Mật Khẩu
};
