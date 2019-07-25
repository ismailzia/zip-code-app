const input = document.querySelector('.input');
const output = document.querySelector('#output');


//add evente listenner 
document.getElementById('zipForm').addEventListener('submit',locationinfo)

//remove 
output.addEventListener('click',function(e){
    e.preventDefault();

    if(e.target.className === "delete"){
        if(confirm("Are you Sure!")){
            document.querySelector('.message').remove();
        }
        input.value = '';
    }
})

function locationinfo(e){

    //make a request
    fetch(`http://api.zippopotam.us/us/${input.value}`)
        .then(response => {
            if(response.status != 200){
                showIcon('remove')
                output.innerHTML = `<article class="message is-danger">
                                        <div class=" message-body"> Invalid Zipcode, please try again</div>
                                    </article>`;
                throw Error(response.statusText);
            }else{
                showIcon('check')
                return response.json();
            }
        })
        .then(data =>{
            let outputText ='';
            data.places.forEach(place => {
                outputText += ` 
                            <article class="message is-primary">
                                <div class="message-header"> 
                                    <p>Location Info</p>
                                    <button class="delete"></button>    
                                </div>
                                <div class="message-body">
                                    <ul>   
                                        <li><strong>City:</strong> ${place['place name']}</li>
                                        <li><strong>State:</strong> ${place.state}</li>
                                        <li><strong>Longitude:</strong> ${place.longitude}</li>
                                        <li><strong>Latitude:</strong> ${place.latitude}</li>
                                    </ul>
                                </div>
                            </article>    `
                
            });
            output.innerHTML = outputText;
        })
        .catch(err => console.log(err));

    e.preventDefault();
}

function showIcon(icon){
    //remove icon    
    document.querySelector('.icon-check').style.display = 'none'; 
    document.querySelector('.icon-remove').style.display = 'none'; 

    //show icon
    document.querySelector(`.icon-${icon}`).style.display = 'inline-flex'; 

}