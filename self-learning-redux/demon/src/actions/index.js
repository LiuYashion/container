





export const increment = () => {
  return dispatch => {

    fetch('https://randomuser.me/api/',{
      method: 'GET',
      cache: "force-cache"
    }).then(res=>{
      return res.json()
    }).then(res=>{
      dispatch({ 
        type: 'INCREMENT',
        user: res.data.results[0]
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
