const api = require("./boot");

const expectModel = (e) => {

  var props = [
    'id',
    'name',
    'email',
  ];

  props.forEach(function (prop) {
    expect(e.hasOwnProperty(prop)).toBeTruthy(true);
  });
}

describe("Users", function () {
  let firstAlias = null;

  it("is getting authenticated user", async function () {

    const user = await api.getUser();

    expect(user).not.toBe(null);

      user.forEach(e => {
        expectModel(e);
      })
  });

});