import axios from 'axios';

enum serveError {
  INTERNAL_SERVER = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNVALAIBLE = 503,
}

export const headers = (token: string = '', isContainFile: boolean = false) => {
  return {
    'Content-Type': isContainFile ? 'multipart/form-data' : 'application/json',
    Authorization: token ? `Bearer ${token}` : token,
  };
};


export const get = async (
  url: string,
  token: string = '',
  data: any = {},
  responseType: any = 'json',
) => {
  try {
    let res;

    res = await axios.get(url, {
      headers: headers(token),
      params: data,
      responseType: responseType,
    });
    return res.data;
  } catch (error) {
    console.log('error',error);
    return error;
  }
};

export const post = async (
  url: string,
  data: any,
  token: string = '',
  params: string = '',
  isContainFile: boolean = false,
) => {
  try {
    console.log('token in apis',token);
    const res: any = await axios.post(params ? `${url}/${params}` : url, data, {
      headers: headers(token, isContainFile),
    });
    return res.data;
  } catch (error) {
    console.log('error',error);
    return error;
  }
};

// export const postTemp= async ()=>{
//   try{
//     let config = {
//       headers: { 
//         'Content-Type': 'application/json', 
//       },
//       data:{
//         "email":"Rabenandrasan@gmail.com",
//         "password":"12rabe"
//        }
//       }
//       const res: any = await axios.post('http://localhost:8080/api/login',config);
//       return res.data;
//     // const response = await fetch('http://localhost:8080/',{
//     //   method:'GET',
//     //   mode:"no-cors",
//     // });
//     // return response.json();
//   } catch (error) {
//     console.log('error',error);
//     return error;
//   }
// }

export const put = async (
  url: string,
  data: any = {},
  token: string = '',
  params: string = '',
) => {
  try {
    const res: any = await axios.put(params ? `${url}/${params}` : url, data, {
      headers: headers(token),
    });

    return res.data;
  } catch (error) {
    console.log('error',error);
    return error;
  }
};

export const remove = async (url: string, token?: string, data: any = null) => {
  try {
    let res;
    if (data) {
      res = await axios.delete(url, {
        headers: token ? headers(token) : headers(),
        data: data,
        withCredentials:true,
      });
    } else {
      res = await axios.delete(url, {
        headers: token ? headers(token) : headers(),
      });
    }
    return res.data;
  } catch (error) {
    console.log('error',error);
    return error;
  }
};

export const patch = async (
  url: string,
  data: any = {},
  token: string = '',
  params: string = '',
  isContainFile: boolean = false,
) => {
  try {
    let res;

    if (!params) {
      res = await axios.patch(url, data, {
        headers: headers(token, isContainFile),
      });
    } else {
      res = await axios.patch(`${url}/${params}`, data, {
        headers: headers(token),
      });
    }
    return res.data;
  } catch (error) {
    console.log('error',error);
    return error;
  }
};
export const getFile = async (
  url: string,
  token: string = '',
  data: any = {},
  responseType: any = 'blob',
) => {
  try {
    let res;

    res = await axios.get(url, {
      headers: headers(token),
      params: data,
      responseType: responseType,
    });
    return res.data;
  } catch (error) {
    console.log('error',error);
    return error;
  }
};
export default {
  get,
  patch,
  post,
  put,
  remove,
  getFile,
};