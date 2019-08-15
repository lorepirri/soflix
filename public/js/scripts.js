(function () {
  
  var apiDocsRepository = (function () {

    var resMovie = {
      '_id': '0',
      'Title': 'String',
      'Description': 'String',
      'Genre': '{ Name:\'String\', Description:\'String\' }',
      'Director': '{ Name:\'String\', Bio:\'String\', Birthyear:\'Date\', Deathyear:\'Date\' }',
      'Actors': '[ObjectID(ActorID)]',
      'ImageURL': 'String',
      'Featured': 'Boolean'
    };

    var resGenre = {
      'Name': 'String',
      'Description': 'String'
    };

    var resDirectors = {
      'Name': 'String',
      'Bio': 'String',
      'Birthyear': 'Date',
      'Deathyear': 'Date'
    };

    var reqUsersPost = { 
      'Name': 'String, required',
      'Username': 'String, required',
      'Password': 'String, required',
      'Email': 'String, required',
      'Birthday': 'Date', 
      'FavoriteMovies': '[ObjectID(MovieID)]'
    };

    var resUsersPost = {
      'Name': 'String',
      'Username': 'String',
      'Password': 'String',
      'Email': 'String',
      'Birthday': 'Date', 
      'FavoriteMovies': '[ObjectID(MovieID)]',
      '_id': '0'
    };

    var reqUsersPut = { 
      'Name': 'String, required',
      'Username': 'String, required',
      'Password': 'String, required',
      'Email': 'String, required',
      'Birthday': 'Date'
    };

    var resUsersPut = {
      'Name': 'String',
      'Username': 'String',
      'Password': 'String',
      'Email': 'String',
      'Birthday': 'Date', 
      'FavoriteMovies': '[ObjectID(MovieID)]',
      '_id': '0'
    };

    var resUsersFavorites = {
      'Name': 'String',
      'Username': 'String',
      'Password': 'String',
      'Email': 'String',
      'Birthday': 'Date', 
      'FavoriteMovies': '[Movies]',
      '_id': '0'
    };

    // this contains all of the apiDocs
    var repository = [
      { 'group': 'Movies', 
        'url': '/movies', 
        'method': 'GET', 
        'request': '', 
        'response': '[Movies]',
        'description': 'Return a list of ALL movies.'
      },
      { 'group': 'Movies', 
        'url': '/movies/:Title', 
        'method': 'GET', 
        'request': '', 
        'response': JSON.stringify(resMovie).replace(/","/g,'",\n "'), 
        'description': 'Return a single Movie by title to the user.'
      },      
      { 'group': 'Genres', 
        'url': '/genres/:Name', 
        'method': 'GET', 
        'request': '', 
        'response': JSON.stringify(resGenre).replace(/","/g,'",\n "'), 
        'description': 'Return a genre by Name (e.g., "Thriller").'
      },      
      { 'group': 'Directors', 
        'url': '/directors/:Name', 
        'method': 'GET', 
        'request': '', 
        'response': JSON.stringify(resDirectors).replace(/","/g,'",\n "'), 
        'description': 'Return a Director by Name.'
      },      
      { 'group': 'Users', 
        'url': '/users', 
        'method': 'POST', 
        'request': JSON.stringify(reqUsersPost).replace(/,"/g,',\n "'),  
        'response': JSON.stringify(resUsersPost).replace(/,"/g,',\n "'), 
        'description': 'Allow new users to register.'
      },
      { 'group': 'Users', 
        'url': '/users/:Username', 
        'method': 'DELETE', 
        'request': '', 
        'response': 'User John Doe with id 0 was deleted.', 
        'description': 'Allow existing users to deregister.'
      },
      { 'group': 'Users', 
        'url': '/users/:Username', 
        'method': 'PUT', 
        'request': JSON.stringify(reqUsersPut).replace(/,"/g,',\n "'),  
        'response': JSON.stringify(resUsersPut).replace(/,"/g,',\n "'), 
        'description': 'Allow users to update their user info.'
      },
      { 'group': 'Favorites', 
        'url': '/users/:Username/:MovieID', 
        'method': 'POST', 
        'request': '',
        'response': JSON.stringify(resUsersFavorites).replace(/,"/g,',\n "'), 
        'description': 'Allow users to add a Movie to their list of favorites.'
      },
      { 'group': 'Favorites', 
        'url': '/users/:Username/:MovieID', 
        'method': 'DELETE', 
        'request': '',
        'response': JSON.stringify(resUsersFavorites).replace(/,"/g,',\n "'), 
        'description': 'Allow users to remove a Movie from their list of favorites.'
      }
    ];

    function getAll() {
      // return the whole repository
      return repository;
    }

    // exposed public functions
    return {
      getAll: getAll
    };
  })(); // end of apiDocRepository
  
  function addApiDocRow(apiDoc, $apiDocTableBody, idx) {

    // create a row for the apiDoc and append it to the table body

    // create main <tr> element
    var $row = document.createElement('tr');
    if (idx % 2 !== 0) {
      $row.classList.add('odd');
    }
    // create as many columns as the number of properties
    for (var property in apiDoc) {
      if (property != 'group' && apiDoc.hasOwnProperty(property)) {
        var $col = document.createElement('td');
        var $apiDocTextCol = document.createTextNode(apiDoc[property]);
        $col.appendChild($apiDocTextCol);
        $col.classList.add(property);
        $row.appendChild($col);
      }
    }
    // appent the <tr> element to the DOM, to the specified <ul>
    $apiDocTableBody.appendChild($row);
  }

  // the the <tbody> element where to append all the <tr> elements
  // each representing an apiDoc row
  var $apiDocTableBody = document.querySelector('#apidocs-table-body');

  if ($apiDocTableBody) {
    // then populate the table body with apiDoc from the repository
    // If there are any apiDoc and the table body
    // exists, go through all of them and append them to it        

    apiDocsRepository.getAll().forEach(function(apiDoc, idx) {
      // append each apiDoc to the specified <tbody> element
      addApiDocRow(apiDoc, $apiDocTableBody, idx);
    });
  }
})();
