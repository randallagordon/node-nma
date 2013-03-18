should = require 'should'
path = require 'path'
fs = require 'fs'
lib = path.join path.dirname(fs.realpathSync(__filename)), '../lib/'

describe 'node-nma', ->
  nma = null

  before ->
    nma = require lib + 'nma'

  it 'should, like, exist...', ->
    should.exist nma

  # TODO: Write some actual tests!
