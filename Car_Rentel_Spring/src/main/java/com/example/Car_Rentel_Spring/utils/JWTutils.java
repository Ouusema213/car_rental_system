package com.example.Car_Rentel_Spring.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

// JWTutils.java

@Component
public class JWTutils {

    private static final  String SECRET_KEY = "e+bGMwDKbmZk1ekbb1VWIUR2PTrtIBEG+3gOxzQswmBxTXd6Y6s70ww0m/sG6og3hepJIThpnIOOFFv24xw40Fw8N2fLuCJsR0VFtFot934JMkCpX7dJy2b1/LmOZNyIfj23kJYCS+RJfJk6JHo4HNEC99KffBnA3MjaJbFxdvlenc7RjpA8IDqlmAZq3nsD9OSEJNPWgZz8/mGfvTrbXjK8eDzGUS/EDQs+h9j6UnzJsC6qwjWoPGgDdSVDFLtytIA/8ucY9kzYIwCJ5lVsCctDqefatMXsGjIeNVczWQu6Mo9bNFtDned7OSMO8cC60QayydYmeHQ2DPit6jQ6NHVCJKqueBqcNeVZ7x/gZL4=\n";


    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public String generateToken(UserDetails userDetails){
        return  generateToken(new HashMap<>(),userDetails);
    }

    public boolean isTokenValid(String token , UserDetails userDetails){
        final String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    private <T> T extractClaim(String token , Function<Claims,T> claimsResolvers){
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }
    private String generateToken(Map<String, Object> extractClaims,UserDetails userDetails){
        return Jwts.builder().setClaims(extractClaims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSigninKey(), SignatureAlgorithm.HS256).compact();
    }


    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getSigninKey()).setAllowedClockSkewSeconds(60000000).build().parseClaimsJws(token).getBody();
    }

    private Key getSigninKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
