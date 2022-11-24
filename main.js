var sanPhamSer = new SanPhamService();

function getELE(id){
    return document.getElementById(id);
}

getListProducts();
function getListProducts(){
    sanPhamSer.layDSSP()
    .then(function(result){
        console.log(result.data);
        renderTable(result.data);
        setLocalStorage(result.data);
    })
    .catch(function(error){
        console.log(error);
    });
}
function setLocalStorage(mangSP){
    localStorage.setItem("DSSP",JSON.stringify(mangSP));
}

getELE("basic-addon2").addEventListener("click",function(){
    var mangSP = getLocalStorage();
    var mangTK = [];
    console.log(mangSP);

    var chuoiTK = getELE("inputTK").value;
    
    mangTK = sanPhamSer.timKiemSP(mangSP,chuoiTK);

    console.log(mangTK);
    renderTable(mangTK);

});

function getLocalStorage(){
    var mangKQ = JSON.parse(localStorage.getItem("DSSP"));
    return mangKQ
}


getELE("btnThemSP").addEventListener("click",function(){
    var footerEle = document.querySelector(".modal-footer");
    footerEle.innerHTML = `
        <button onclick="addProducts()" class="btn btn-success">Add Product</button>
    `;
});

function renderTable(mangSP){
    var content = "";
    var count = 1;
    mangSP.map(function(sp,index){
        content += `
            <tr>
                <td>${count}</td>
                <td>${sp.tenSP}</td>
                <td>${sp.gia}</td>
                <td>${sp.hinhAnh}</td>
                <td>${sp.moTa}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSP('${sp.id}')">Xóa</button>
                    <button class="btn btn-info" onclick="xemSP('${sp.id}')">Xem</button>
                </td>
            </tr>
        `;
        count++;
    });
    getELE("tblDanhSachSP").innerHTML = content;
}

function addProducts(){  
    var tenSP = getELE("TenSP").value;
    var gia = getELE("GiaSP").value;
    var hinhAnh = getELE("HinhSP").value;
    var moTa = getELE("MoTa").value;

    var sp = new SanPham(tenSP,gia,hinhAnh,moTa);
    console.log(sp);

    sanPhamSer.themSP(sp)
    .then(function(result){
         getListProducts();   
         document.querySelector("#myModal .close").click();
    })
    .catch(function(error){
        console.log(error);
    });


}

function xoaSP(id){
    sanPhamSer.xoaSanPham(id)
    .then(function(result){
         getListProducts();
        
    })
    .catch(function(error){
        console.log(error);
    });

}

function xemSP(id){
    sanPhamSer.xemSanPham(id)
    .then(function(result){
        console.log(result.data);
        $('#myModal').modal('show');
        getELE("TenSP").value  = result.data.tenSP;
        getELE("GiaSP").value = result.data.gia
        getELE("HinhSP").value = result.data.hinhAnh;
        getELE("MoTa").value = result.data.moTa;

        var footerEle = document.querySelector(".modal-footer");
        footerEle.innerHTML = `
            <button onclick="capNhatSP('${result.data.id}')" class="btn btn-success">Update Product</button>
        `;

    })
    .catch(function(error){
        console.log(error);
    });

}

function capNhatSP(id){
    var tenSP = getELE("TenSP").value;
    var gia = getELE("GiaSP").value;
    var hinhAnh = getELE("HinhSP").value;
    var moTa = getELE("MoTa").value;

    var sp = new SanPham(tenSP,gia,hinhAnh,moTa);
    console.log(sp);

    sanPhamSer.capNhatSanPham(id,sp)
    .then(function(result){
        console.log(result.data);
         getListProducts();
         document.querySelector("#myModal .close").click();
    })
    .catch(function(error){
        console.log(error);
    });

}

