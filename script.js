$(document).ready(function(){
    //Retrieve the data from the JSON file, 
    //use 'data' later on to pass it to the populate-city-dropdown.php file
    $.get("https://api.npoint.io/66866aef2c21692fe055", function(data){

        let countryArr = []; //use this array to save all the countries (just the countries) from the JSON file

        data.forEach(element => {
            countryArr.push(element.country); //pushing all the countries to the array
        });

        console.log(countryArr);
        console.log(data);

        //Populate the country dropdown with the countries in the JSON file
        //First way to make the request
        // $.post("populate-country-dropdown.php", {countries: countryArr}, function(data){
        //     // Display the returned data in country dropdown
        //     $("#country-dropdown").html(data);
        // });

        //Second way to make the request
        $.ajax({
            type: "POST",
            url: "populate-country-dropdown.php",
            data: { countries : countryArr } //send the array with the countries
        }).done(function(data){
            // Display the returned data in country dropdown
            $("#country-dropdown").html(data);
        });

        //Populate the city dropdown based on the selected country
        //First way
        // $("select#country").on("change", function(){
        //     let selectedCountry = $("#country option:selected").val();
        //     $.ajax({
        //         type: "POST",
        //         url: "populate-city-dropdown.php",
        //         data: { country : selectedCountry, countryData: data } 
        //         //send the selected country, and the data from the JSON file
        //     }).done(function(data){
        //         $("#city-dropdown").html(data);
        //     });
        // });

        //Second way
        $(document.body).on('change','#country', function(){
            let selectedCountry = $("#country option:selected").val();
            $.ajax({
                type: "POST",
                url: "populate-city-dropdown.php",
                data: { country : selectedCountry, countryData: data } 
                //send the selected country, and the data from the JSON file
            }).done(function(data){
                $("#city-dropdown").html(data);
            });
        });
    });

    let onFormSubmitMessage = "";
    let invalidInputs = [];

    $("form").submit(function(event){
        // Stop form from submitting normally
        event.preventDefault();

        onFormSubmitMessage = "Success: The form was filled in correctly";
        invalidInputs = []  ;
        $("#details").text("");

        validateCountry();
        validatePrice();
        validateBirthDate();

        $("#message").text(onFormSubmitMessage);
        if (invalidInputs.length !== 0){
            $("#details").text("The error was found in some of the following inputs: " 
                                + invalidInputs.join(', '));
        }
    });

    function validateCountry(){
        let country = $("#country").val();
        if (country === 'Select'){
            onFormSubmitMessage = "Error: The form was not filled in correctly";
            invalidInputs.push("country");
        }
    }

    function validatePrice(){
        let price = $("#price").val();
        let priceNumber = parseFloat(price);
        if(price === ""){
            onFormSubmitMessage = "Error: The form was not filled in correctly";
            invalidInputs.push("price");
        }
        else if (priceNumber <= 0){
            onFormSubmitMessage = "Error: The form was not filled in correctly";
            invalidInputs.push("price");
        }
    }

    function validateBirthDate(){
        let today = new Date();

        // Get year, month, and day part from the date
        var year = today.toLocaleString("default", { year: "numeric" });
        var month = today.toLocaleString("default", { month: "2-digit" });
        var day = today.toLocaleString("default", { day: "2-digit" });

        // Generate yyyy-mm-dd date string
        var formattedDateToday = year + "-" + month + "-" + day;

        if($("#birthDate").val() === ""){
            onFormSubmitMessage = "Error: The form was not filled in correctly";
            invalidInputs.push("birth date");
        }
        else if ($("#birthDate").val() > formattedDateToday){
            onFormSubmitMessage = "Error: The form was not filled in correctly";
            invalidInputs.push("birth date");
        }
    }
});