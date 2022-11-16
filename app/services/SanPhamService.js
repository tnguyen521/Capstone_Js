//Danh sách sản phẩm

function SanPhamService() {

    //lấy danh sach sản phẩm
    // 
    this.layDanhSachSP = function () {
        //chờ lấy dữ liệu (pending)
        var promise = axios({
            method: 'get',
            url: 'https://636a2049c07d8f936d93d252.mockapi.io/Products',
        });

        // console.log(promise);

        return promise;

    }

    this.themSP = function (spNew) {
        // data: dữ liệu lưu xuống BE (dữ liệu kiểu object)
        //trả về đối tương promise từ thư viện axios
        return axios({
            method: 'post',
            url: 'https://636a2049c07d8f936d93d252.mockapi.io/Products',
            data: spNew
        });


    }

    this.xoaSP = function (id) {
        return axios({
            method: 'delete',
            url: `https://636a2049c07d8f936d93d252.mockapi.io/Products/${id}`
        });
    }

    // getDetail
    this.layChiTietSP = function (id) {
        return axios({
            method: 'get',
            url: `https://636a2049c07d8f936d93d252.mockapi.io/Products/${id}`
        });
    }

}