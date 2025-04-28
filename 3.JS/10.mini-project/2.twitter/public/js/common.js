async function logout(){
    const res = await fetch('/api/logout', {method:'POST'});
    const data = await res.json();

    if(res.ok){
        alert(data.message);
    }else{
        alert(data.error);
    }
}