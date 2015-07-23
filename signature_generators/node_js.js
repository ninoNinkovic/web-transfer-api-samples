/*
The MIT License (MIT)

Copyright (c) 2015 Signiant Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
var jwt = require('jsonwebtoken');

//generateToken generates a signed JWT using API Key, Config ID, Secret Key, and Audience.
var apiKey = ""; //get this from https://manage.signiant.com
var configId = ""; //get this from https://manage.signiant.com
var secret = ""; //get this from https://manage.signiant.com
var audience = "signiant_flight_console";

/**
  * returns a signed JWT token
  * @return null
*/
var generateToken = function ( apiKey, configId, secret, audience) {
    var claims = buildClaims(apiKey, configId, audience);
    return jwt.sign(claims, secret, getOptions());
}

/**
  * Builds the claims required by generateToken
  * @return (String) claims
*/
var buildClaims = function(apiKey, configId, audience)
{
    var claims = new Object();
    claims.iss = apiKey;
    claims.cfg = configId;
    claims.aud = audience;
    return claims;
}

/**
  * Builds the claims required by generateToken
  * @return (Hash) algorithm, expiresInMinutes
*/
var getOptions = function()
{
    return  { algorithm: 'HS256', expiresInMinutes: 5};
}


module.exports = generateToken;
