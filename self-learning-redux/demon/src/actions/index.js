





export const increment = () => {
  // return { type: 'INCREMENT' }
  return dispatch => {

    fetch('https://randomuser.me/api/',{
      method: 'GET',
      cache: "force-cache"
    }).then(res=>{
      return res.json()
    }).then(res=>{
      dispatch({ 
        type: 'INCREMENT',
        user: res.results[0].email
      })
    })
    // setTimeout(() => {
    //   dispatch({ type: 'INCREMENT' })
    // }, 2000);
  }
};

export const decrement = () => {
  return { type: 'DECREMENT' }
};
