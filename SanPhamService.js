function SanPhamService() {
    this.layDSSP = function () {
        var promise = axios({
            method: 'get',
            url: 'https://5dcda609d795470014e4d2b9.mockapi.io/api/Products'
            
        });

        return promise;
    }
    this.themSP = function (sp) {
       
        var promise = axios({
            method: 'post',
            url: 'https://5dcda609d795470014e4d2b9.mockapi.io/api/Products',
            data: sp
        });

        return promise;
    }
    this.xoaSanPham = function (id) {
        var promise = axios({
            method: 'delete',
            url: `https://5dcda609d795470014e4d2b9.mockapi.io/api/Products/${id}`
        });

        return promise;
    }
    this.xemSanPham = function (id) {
        var promise = axios({
            method: 'get',
            url: `https://5dcda609d795470014e4d2b9.mockapi.io/api/Products/${id}`
        });

        return promise;
    }
    this.capNhatSanPham = function (id, sp) {
        var promise = axios({
            method: 'put',
            url: `https://5dcda609d795470014e4d2b9.mockapi.io/api/Products/${id}`,
            data: sp
        });

        return promise;
    }


    this.timKiemSP = function(mangSP, chuoiTK){

        var mangTK = [];
       mangTK = mangSP.filter(function(sp){
            return sp.tenSP.toLowerCase().indexOf(chuoiTK.toLowerCase()) >= 0;
        });
        return mangTK;
    }


}