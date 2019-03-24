var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('https://radiant-harbor-82820.herokuapp.com/animal' , function(error, response, body) {
        expect(body).to.equal('{"message":"hello animal"}');
        done();
    });
});