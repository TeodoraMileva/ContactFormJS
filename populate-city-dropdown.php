<?php
if(isset($_POST["country"])){
    // Capture selected country
    $country = $_POST["country"];
    // Capture the data from the JSON file
    $countryData = $_POST["countryData"];
    
    $arrayCountries = []; //Array with all the countries
    $arrayCities = []; // Array with the groups of cities

    foreach ($countryData as $value) {
        array_push($arrayCountries, $value["country"]);
        array_push($arrayCities, $value["cities"]);
    }

    // Define country and city array
    $countryCities = array_combine($arrayCountries, $arrayCities);

    // Display city dropdown based on country name
    if($country !== 'Select'){
        echo "<label for='city'>City:</label>";
        echo "<select name='city' id='city'>";
        echo "<option>" . "Select" . "</option>";
        foreach($countryCities[$country] as $value){
            echo "<option>". $value . "</option>";
        }
        echo "</select>";
    } 
}
?>