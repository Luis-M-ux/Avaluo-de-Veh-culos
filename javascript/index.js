const vehiculos_ = document.querySelector('#selectprimary');
vehiculos_.addEventListener('change', () => {
    let vihiklo = vehiculos_.value;

    fetch(`https://parallelum.com.br/fipe/api/v1/${vihiklo}/marcas`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let options =`<option value="">Seleccione la Marca</option>`
        json.forEach(element => options += `<option value="${element['nome']}${element['codigo']}">${element['nome']}</option>`)
        selectsecondary.innerHTML = options;
    }) 

    const mrk_Vhiqlo = document.querySelector('#selectsecondary')
    mrk_Vhiqlo.addEventListener('change', () =>{
        let vehiculo = mrk_Vhiqlo.value;
        const code = vehiculo.replace(/[^0-9]+/g, "");
        fetch(`https://parallelum.com.br/fipe/api/v1/${vihiklo}/marcas/${code}/modelos`)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
            modelVehiql = json.modelos;
            // anioVehiql = json.anos;

            let options =`<option value="">Seleccione un Modelo</option>`
            modelVehiql.forEach(element => options += `<option value="${element['nome']}${element['codigo']}">${element['nome']}</option>`)
            selectThird.innerHTML = options;
        })
        
        const codigo_modeloVhiqlo = document.querySelector('#selectThird')
        codigo_modeloVhiqlo.addEventListener('change', () => {
            
            let markVehi = codigo_modeloVhiqlo.value;

            let responser = codigo_modeloVhiqlo.options[codigo_modeloVhiqlo.selectedIndex];
            
            let codigoM = responser.value;

            let arrObj = codigoM.split(' ');

            const last = arrObj[arrObj.length -1];
            const coder = last.replace(/[^0-9]+/g, "");
           
            fetch(`https://parallelum.com.br/fipe/api/v1/${vihiklo}/marcas/${code}/modelos/${coder}/anos`)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
                let annio = json.nome;
                let options =`<option value="">Seleccione el Año</option>`
                json.forEach(element => options += `<option value="${element['nome']}">${element['nome']}</option>`)
                selectFour.innerHTML = options;
            })

            const valur = document.querySelector('#selectFour')
            valur.addEventListener('change', () => {
                let cuantoVale = valur.value;
                const va = cuantoVale.replace(/[^0-9]+/g, "");

    
                const costo = cuantoVale.replace(/[^0-9]+/g, "");
                fetch(`https://parallelum.com.br/fipe/api/v1/${vihiklo}/marcas/${code}/modelos/${coder}/anos/${va}-1`)
                .then(res => res.ok ? res.json() : Promise.reject(res))
                .then(json => {
                    let options =`<th>hola</th>`

                    let properties = Object.keys(json);
                    let values = Object.values(json);
                    // json.forEach(element => options += `<option value="${element['valor']}">${element['valor']}</option>`)
                    table.innerHTML = properties;
                    table.innerHTML =values; 
                    // table.innerHTML = json.Marca;
                })
            })

        })

    })

})