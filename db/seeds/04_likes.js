exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        // knex('likes').insert({
        //   id: 1,
        //   user_id: 1,
        //   resource_id: 2
        // }),
        // knex('likes').insert({
        //   id: 2,
        //   user_id: 2,
        //   resource_id: 3
        // }),
        // knex('likes').insert({
        //   id: 3,
        //   user_id: 3,
        //   resource_id: 1
        // })
      ]);
    });
};
