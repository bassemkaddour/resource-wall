$(() => {
  var urlParams = new URLSearchParams(window.location.search);
  var urlParamsString = urlParams.get('query');

  $.ajax({
    method: "GET",
    url: "/api/search/",
    data: urlParamsString
  }).then((resources) => {
  for(resource of resources.results) {
        createResourceElement(resource, resources.userId).appendTo($(".grid"));
    }
  });
});
