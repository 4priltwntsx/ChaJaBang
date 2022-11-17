import http from "./http";

function sidoList(success, fail) {
    http.get(`/house`).then(success).catch(fail);

}

function gugunList(sidoName, success, fail) {
    http.get(`/house/${sidoName}`).then(success).catch(fail);

}

function dongList({sidoName, gugunName}, success, fail) {
    http.get(`/house/${sidoName}/${gugunName}`).then(success).catch(fail);

}

function houseList({sidoName, gugunName, dongName}, success, fail) {
    http.get(`/house/${sidoName}/${gugunName}/${dongName}`).then(success).catch(fail);

    
}

export { sidoList, gugunList, dongList, houseList };