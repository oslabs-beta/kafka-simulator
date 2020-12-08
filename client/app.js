document.addEventListener('DOMContentLoaded', setupHandlers);

function setupHandlers() {
  document
    .getElementById('new-listing')
    .addEventListener('click', () => callServer('listing'));
  document
    .getElementById('new-user')
    .addEventListener('click', () => callServer('user'));
  document
    .getElementById('new-review')
    .addEventListener('click', () => callServer('review'));
  document
    .getElementById('admin')
    .addEventListener('click', () => callServer('admin'));
}

function callServer(action) {
  console.log(action);
  fetch(`/api/k/${action}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
