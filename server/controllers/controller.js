const { User, Wishlist } = require('../models/index');
const { comparePass } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class Controller {
  static postRegister(req, res) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then((user) => {
        res.status(201).json({
          id: user.id,
          email: user.email,
          saldo: +user.saldo
        })
      })
      .catch(err => {
        if (err.errors) {
          res.status(400).json(err.errors)
        } else {
          console.log(err)
          res.status(500).json({message:'internal server error'})
        }
      })
  }

  static postLogin(req, res) {
    const {email,password}=req.body;
    User.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if (!user) {
        throw { msg: 'invalid email or password'}
      } else {
        const passIsValid = comparePass(password, user.password);
        if(!passIsValid) {
          throw { msg: 'invalid email or password'}
        } else {
          const access_token = generateToken({
            id: user.id,
            email: user.email
          })
          console.log(access_token);
          res.status(200).json({
            id: user.id,
            email:user.email,
            access_token,
            saldo: user.saldo
          })
        }
      }
    })
    .catch(err => {
      if (err.msg) {
        res.status(400).json({message: err.msg})
      } else {
        console.log(err)
        res.status(500).json({message:'internal server error'})
      }
    })
  }

  //jangan lupa di post wishlist perlu cek saldo!
  static postWishlists(req, res) {
    const {name, price, image_url, description } =req.body;
    let UserId = req.decoded.id;
    let saldo;
    User.findByPk(UserId)
    .then(user => {
      if (user.saldo < price) {
        throw {msg: 'duit ga cukup'}
      } else {
        let currSaldo = user.saldo - price;
        User.update({saldo: currSaldo}, {
          where: {id:UserId},
          returning: true
        })
        .then(updatedUser => {
          console.log(updatedUser,'ini user')
          saldo = updatedUser[1][0].saldo;
          return Wishlist.create({
            name, price, image_url, UserId, description,saldo
          })
        })
        .then((wishlist)=> {
          console.log(saldo, 'ini saldo')
          res.status(201).json({
            id: wishlist.id,
            name: wishlist.name,
            price: wishlist.price,
            image_url: wishlist.image_url,
            UserId: wishlist.UserId,
            description: wishlist.description,
            saldo
          })
        })
        .catch(err => {
          console.log(err)
          if(err.msg) {
            res.status(400).json({message: err.msg})
          } else {
            res.status(500).json({message:'internal server error'})
          }
        })
      }
    })
    .catch(err => {
      console.log(err)
      if(err.msg) {
        res.status(400).json({message: err.msg})
      } else {
        res.status(500).json({message:'internal server error'})
      }
    })
  }

  static getWishlists(req, res) {
    const loginUserId = req.decoded.id;
    Wishlist.findAll({
      where: {
        UserId: loginUserId
      }
    })
    .then(wishlists => {
      res.status(200).json(wishlists)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message:'internal server error'})
    })
  }


  static delWishlists(req, res) {
    let wishlistId = +req.params.id;
    let refund;
    let saldo;
    let UserId;
    Wishlist.findByPk(wishlistId)
    .then(wishlist => {
      refund = wishlist.price;
      UserId = wishlist.UserId;
      return User.findByPk(wishlist.UserId)
    })
    .then(user => {
      let currSaldo = user.saldo + refund;
      console.log(currSaldo)
      return User.update({saldo: currSaldo}, {
        where: {id:UserId},
        returning: true
      })
    })
    .then(updatedUser => {
      saldo = updatedUser[1][0].saldo;
      return Wishlist.destroy({
        where: {
          id: wishlistId
        }
      })
    })
    .then(isDeleted => {
      res.status(200).json({
        message: 'Successfully delete Wishlist',
        saldo
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message:'internal server error'})
    })
  }
}

module.exports = Controller;