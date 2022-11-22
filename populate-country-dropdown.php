<?php
$countries = $_POST["countries"];
echo "<label for='country'>Country:</label>";
echo "<select name='country' id='country'>";
echo "<option>" . "Select" . "</option>";
foreach ($countries as $country) {
    echo "<option value = '" . $country . "'";
    echo ">" . $country . "</option>";
}
echo "</select>";
?>