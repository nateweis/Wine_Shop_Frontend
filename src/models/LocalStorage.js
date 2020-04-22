class LocalStorage{
    static storeTotal(total){
        localStorage.setItem('total', total)
    }

    static getTotal(){
      return  localStorage.getItem('total')
    }

    static removeTotal(){
        localStorage.removeItem('total')
    }
}
export default LocalStorage