let trash = document.getElementsByClassName("fa-trash")



Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    let word = this.parentNode.parentNode.childNodes[1].innerText
    fetch('deleteWord', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'word' : word
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});