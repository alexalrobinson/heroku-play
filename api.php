<?php

    //this is the basic way of getting a database handler from PDO, PHP's built in quasi-ORM
    $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
    if (!$dbhandle) die ($error);

    if($_GET["button"] == "newGame"){
    //this is a sample query which gets some data, the order by part shuffles the results
    //the limit 0, 10 takes the first 10 results.
    // you might want to consider taking more results, implementing "pagination", 
    // ordering by rank, etc.
      $query = "SELECT rack FROM racks WHERE length>7 order by random() limit 1";
    
    //this next line could actually be used to provide user_given input to theo 
    //avoid SQL injection attacks
      $statement = $dbhandle->prepare($query);
      $statement->execute();
    
    //The results of the query are typically many rows of data
    //there are several ways of getting the data out, iterating row by row,
    //I chose to get associative arrays inside of a big array
    //this will naturally create a pleasant array of JSON data when I echo in a couple lines

      $results = $statement->fetchALL(PDO::FETCH_ASSOC);
      echo json_encode($results);
    }
    else {
        $query = "SELECT words FROM racks WHERE words LIKE $_GET[guess]";
        $statement = $dbhandle->prepare($query);
        $statement->execute();
        $word = $statement->fetch(PDO::FETCH_ASSOC);
        echo json_encode($word);
    }
?>
