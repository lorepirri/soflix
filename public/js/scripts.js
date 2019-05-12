(function () {
  
  var apiDocsRepository = (function () {

    var resMovie = {
      'id': '0',
      'title': '...',
      'year': '2010',
      'description': '...',
      'genre': 'SciFi',
      'director': '...',
      'imageURL': '',
      'featured': 'false'
    };

    var resGenre = {
      'name': 'SciFi',
      'description': '...'
    };

    var resDirectors = {
      'name': 'Christopher',
      'bio': '',
      'birthyear': '',
      'deathyear': ''
    };

    var reqUsersPost = { 
      'name': 'John Doe',
      'username': 'john',
      'password': '',
      'email': '...',
      'birthday': '', 
      'favorites': []
    };

    var resUsersPost = {
      'name': 'John Doe',
      'username': 'john',
      'password': '',
      'email': '...',
      'birthday': '',
      'favorites': [],
      'id': '0'
    };

    var reqUsersPut = { 
      'name': 'John Doe',
      'username': 'john',
      'password': '',
      'email': '...',
      'birthday': ''
    };

    var resUsersPut = {
      'name': 'John Doe',
      'username': 'john',
      'password': '',
      'email': '...',
      'birthday': '',
      'favorites': [],
      'id': '0'
    };

    var resUsersFavorites = {
      'name': 'John Doe',
      'username': 'john',
      'password': '',
      'email': '...',
      'birthday': '',
      'favorites': ['1'],
      'id': '0'
    };

    // this contains all of the apiDocs
    var repository = [
      { 'group': 'Movies', 
        'url': '/movies', 
        'method': 'GET', 
        'query': 'none', 
        'request': '', 
        'response': '[ { ... }, ... ]',
        'description': 'Return a list of ALL movies.'
      },
      { 'group': 'Movies', 
        'url': '/movies/:title', 
        'method': 'GET', 
        'query': 'none', 
        'request': '', 
        'response': JSON.stringify(resMovie).replace(/","/g,'",\n "'), 
        'description': 'Return data (description, genre, director, image URL, whether it\'s featured or not) about a single movie by title to the use.'
      },      
      { 'group': 'Genres', 
        'url': '/genres/:name', 
        'method': 'GET', 
        'query': 'none', 
        'request': '', 
        'response': JSON.stringify(resGenre).replace(/","/g,'",\n "'), 
        'description': 'Return data about a genre (description) by name (e.g., "Thriller").'
      },      
      { 'group': 'Directors', 
        'url': '/directors/:name', 
        'method': 'GET', 
        'query': 'none', 
        'request': '', 
        'response': JSON.stringify(resDirectors).replace(/","/g,'",\n "'), 
        'description': 'Return data about a director (bio, birth year, death year) by name.'
      },      
      { 'group': 'Users', 
        'url': '/users', 
        'method': 'POST', 
        'query': 'none', 
        'request': JSON.stringify(reqUsersPost).replace(/,"/g,',\n "'),  
        'response': JSON.stringify(resUsersPost).replace(/,"/g,',\n "'), 
        'description': 'Allow new users to register.'
      },
      { 'group': 'Users', 
        'url': '/users/:id', 
        'method': 'DELETE', 
        'query': 'none', 
        'request': '', 
        'response': 'User John Doe with id 0 was deleted.', 
        'description': 'Allow existing users to deregister.'
      },
      { 'group': 'Users', 
        'url': '/users/:id', 
        'method': 'PUT', 
        'query': 'none', 
        'request': JSON.stringify(reqUsersPut).replace(/,"/g,',\n "'),  
        'response': JSON.stringify(resUsersPut).replace(/,"/g,',\n "'), 
        'description': 'Allow users to update their user info (username, password, email, date of birth).'
      },
      { 'group': 'Favorites', 
        'url': '/users/:id/:movie-id', 
        'method': 'POST', 
        'query': 'none', 
        'request': '',
        'response': JSON.stringify(resUsersFavorites).replace(/,"/g,',\n "'), 
        'description': 'Allow users to add a movie to their list of favorites.'
      },
      { 'group': 'Favorites', 
        'url': '/users/:id/:movie-id', 
        'method': 'DELETE', 
        'query': 'none', 
        'request': '',
        'response': JSON.stringify(resUsersFavorites).replace(/,"/g,',\n "'), 
        'description': 'Allow users to remove a movie from their list of favorites.'
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
