<?php
  $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
  if (!$dbhandle) die ($error);
  if($_GET["button"] == "newGame"){
    $query = "SELECT rack, words FROM racks WHERE length=7 and weight <= 10 order by random() limit 0, 1";
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    $results = $statement->fetch(PDO::FETCH_ASSOC);
    echo json_encode($results);
  }
?>
