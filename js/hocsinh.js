function emailIsValid(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function sdtIsValid(phone){
    return /((09|03|07|08|05)+([0-9]{8})\b)/.test(phone)
}
function Luu(){
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';

    if(document.getElementById('male').checked){
        gender = document.getElementById('male').value;
    } else if(document.getElementById('famale').checked){
        gender = document.getElementById('famale').value;
    }
    /*Định dạng họ tên********************************************************************/ 
    if(_.isEmpty(fullname)) {
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập họ và tên';
    } else if(fullname.trim().length <= 2){
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Không được nhỏ hơn 2 ký tự';
    }else if(fullname.trim().length > 50){
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Không được lớn hơn 50 ký tự';
    }else{
        document.getElementById('fullname-error').innerHTML = '';
    }
    /*Định dạng email********************************************************************/ 
      if(_.isEmpty(email)) {
        email = '';
        document.getElementById('email-error').innerHTML = 'Vui lòng nhập email';
    } else if(!emailIsValid(email)){
        email = '';
        document.getElementById('email-error').innerHTML = 'Email không đúng định dạng';
    }else{
        document.getElementById('email-error').innerHTML = '';
    }
    /*Định dạng phone********************************************************************/ 
      if(_.isEmpty(phone)) {
        phone = '';
        document.getElementById('phone-error').innerHTML = 'Vui lòng nhập số điện thoại';
    } else if(phone.trim().length > 10 ){/*Kiểm tra sđt có lớn hơn 10 không*/
         phone = '';
        document.getElementById('phone-error').innerHTML = 'Số điện thoại không đúng định dạng';
    }else if(phone.trim().length < 10 ){/*Kiểm tra sđt có nhỏ hơn 10 không*/
        phone = '';
        document.getElementById('phone-error').innerHTML = 'Số điện thoại không đúng định dạng';
    }else if(!sdtIsValid(phone)){/*Kiểm tra đầu số điện thoại*/
        phone = '';
        document.getElementById('phone-error').innerHTML = 'Số điện thoại không đúng định dạng';
    }else{
        document.getElementById('phone-error').innerHTML = '';
    }
    /*Định dạng địa chỉ********************************************************************/ 
     if(_.isEmpty(address)) {
        address = '';
        document.getElementById('address-error').innerHTML = 'Vui lòng nhập địa chỉ';
    }else{
        document.getElementById('address-error').innerHTML = '';
    }
     /*Định dạng giới tính********************************************************************/ 
     if(_.isEmpty(gender)) {
        gender = '';
        document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính';
    }else{
        document.getElementById('gender-error').innerHTML = '';
    }
    /*Kiểm tra dữ liệu lưu vào danh sách********************************************************************/ 
    if(fullname && email && phone && address && gender) {
        //Lưu vào danh sách
        
        let hocsinh = localStorage.getItem('hocsinh') ? JSON.parse(localStorage.getItem('hocsinh')) : [];
        
        hocsinh.push({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        });

        localStorage.setItem('hocsinh', JSON.stringify(hocsinh));

        this.renderListHocSinh();
    }
} 
 /*Lưu vào danh sách********************************************************************/
 function renderListHocSinh()
 {
    let hocsinh = localStorage.getItem('hocsinh') ? JSON.parse(localStorage.getItem('hocsinh')) : [];
    if (hocsinh.length === 0) {
        document.getElementById('list-hocsinh').style.display = 'none';
        return false;
    }
    document.getElementById('list-hocsinh').style.display = 'block';

    let tableContent = `<tr>
        <td>#</td>
        <td>Họ và tên</td>
        <td>Email</td>
        <td>Điện thoại</td>
        <td>Giới tính</td>
        <td>Địa chỉ</td>
        <td>Hành Động</td>
    </tr>`;

    hocsinh.forEach((hocsinh, index) => {
        let hocsinhId = index;
        let genderLabel = parseInt(hocsinh.gender) === 1 ? 'Nam' : 'Nữ';
        index++;
        tableContent += `<tr>
            <td>${index}</td>
            <td>${hocsinh.fullname}</td>
            <td>${hocsinh.email}</td>
            <td>${hocsinh.phone}</td>
            <td>${genderLabel}</td>
            <td>${hocsinh.address}</td>
            <td>
                <a href='#'>Edit</a> |   <a href='#' onclick= 'XoaHS(${hocsinhId})'>Delete</a>
            </td>
        </tr>`;
    })
    document.getElementById('list-hs').innerHTML = tableContent;
 }
 /*Xóa danh sách sinh viên********************************************************************/
function XoaHS(id)
{
    let hocsinh = localStorage.getItem('hocsinh') ? JSON.parse(localStorage.getItem('hocsinh')) : [];
    hocsinh.splice(id, 1);
    localStorage.setItem('hocsinh', JSON.stringify(hocsinh));
    renderListHocSinh();
}