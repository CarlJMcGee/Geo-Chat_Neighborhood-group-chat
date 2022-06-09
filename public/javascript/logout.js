async function logoutFormHandler(){
    const response = await fetch ('/api/user/logout',{
       
        method: 'post',
        header: {'Content-Type': 'application/json'}
    });

    if (response.ok){
        document.location.replace('/');
    } else{
        alert(response.statusText);
    }
}
document.querySelector('#log-out').addEventListener('click', logoutFormHandler);