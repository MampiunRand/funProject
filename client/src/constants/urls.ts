class Urls {
    BASE = 'http://localhost:8080/api';
    LOGIN=`${this.BASE}/login`;
    UPDATEUSER=`${this.BASE}/user/:id`;
    LOGOUT=`${this.BASE}/logout`;
    MANYUSERS=`${this.BASE}/users`;
    CREATEUSER=`${this.BASE}/signup`;
    CREATEPOST=`${this.BASE}/post/create`;
    UPDATEPOST=`${this.BASE}/post/update`;
    DELETEPOST=`${this.BASE}/post/delete`;
    MANYPOST=`${this.BASE}/posts`;
}
export default new Urls();
