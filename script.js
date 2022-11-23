$(document).ready(function(){
    //Retrieve the data from the JSON file, 
    //use 'data' to access the data from the file when you need it
    $.get("https://api.npoint.io/66866aef2c21692fe055", function(data){

        console.log(data);

        //Populate the country dropdown with the countries in the JSON file
        $("#country-dropdown").append("<label for='country'>Country:</label>")
                              .append("<select name='country' id='country'>");

        $("#country").append("<option>Select</option>");

        data.forEach(element => {
            $("#country").append("<option value = '" + element.country + "'" +
                                          ">" + element.country + "</option>");
        });

        $("#country-dropdown").append("</select>");

        //Populate the city dropdown based on the selected country
        $(document.body).on('change','#country', function(){

            $("#city-dropdown").empty();

            let selectedCountry = $("#country option:selected").val();

            if (selectedCountry !== "Select"){

                let selectedCountryInfo = data.find(checkCountry);

                function checkCountry(countryInfo){
                    return countryInfo.country === selectedCountry;
                }

                $("#city-dropdown").append("<label for='city'>City:</label>")
                                   .append("<select name='city' id='city'>");

                $("#city").append("<option>Select</option>");

                selectedCountryInfo.cities.forEach(element => {
                    $("#city").append("<option value = '" + element + "'" +
                                                  ">" + element + "</option>");
                });

                $("#city-dropdown").append("</select>");
            }
        });
    });

    //Validation on form submit
    let onFormSubmitMessage = "";
    let invalidInputs = [];

    $("form").submit(function(event){
        // Stop form from submitting normally
        event.preventDefault();

        onFormSubmitMessage = "Success: The form was filled in correctly";
        invalidInputs = []  ;
        $("#details").text("");

        validateCountry();
        validateCity();
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

    function validateCity(){
        let city = $("#city").val();
        if (city === 'Select'){
            onFormSubmitMessage = "Error: The form was not filled in correctly";
            invalidInputs.push("city");
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