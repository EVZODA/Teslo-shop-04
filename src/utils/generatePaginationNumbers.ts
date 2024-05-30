
export const generatePaginationNumbers = (currentPage:number, TotalPages:number) => {

    // si el numero total de pagina es 7 o menos vamos a mostrar las paginas sin puntos suspensivos

    if (TotalPages<=7){
        return Array.from({length:TotalPages},(_, i)=> i + 1)
    }

    // si la pagina actual esta entre las primeras 3 paginas

    if (currentPage<=3) {
        return [1,2,3,'...',TotalPages-1, TotalPages]
    }

    // si la pagina actual esta entre las ultimas 3 paginas 
    // mostrar las primeras 2, puntos suspensivos, las ultimas 3 paginas

    if (currentPage>=TotalPages-2){
        return [1,2,'...',TotalPages-2, TotalPages-1, TotalPages]
    }

   return [
    1,
    '...',
    currentPage-1,
    currentPage,
    currentPage+1,
    '...',
    TotalPages
   ]

}