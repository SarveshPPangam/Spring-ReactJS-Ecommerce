import React, { useContext, useEffect } from "react"


function Req() {


    var creds = {"email":"c@c.com","password":"s"};
    console.log(creds);
    useEffect(() => {
        console.log('inside useEffect')
        fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            body: JSON.stringify(creds),
            headers: {
                "Content-Type": "application/json",
                // "Authorization": "Bearer " + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                //                console.log(r)
                const d = JSON.parse(r)
                console.log(d);
            })
        }, function (error) {
            console.log(error.message)
        })
    }, [])
  return (
    <div className="App">
        <h1>j</h1>
    </div>
  );
}

export default Req;
