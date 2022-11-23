package com.ssafy.pjt.controller.house.alpha;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.json.JSONObject;
import org.json.XML;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/frequent")
@CrossOrigin(origins = { "*" }, maxAge = 6000)
public class FrequentzoneController {
	
	@GetMapping(value="/{searchYearCd}/{siDo}/{guGun}", produces = "application/json; charset=utf-8")
	public ResponseEntity<String> accident(@PathVariable("searchYearCd") String searchYearCd, @PathVariable("siDo") String siDo, @PathVariable("guGun") String guGun) throws IOException {
		String servicekey = "xcuFoZoMRX77SQYIL9EDahYswj90iA2Az%2Ftk2WVwqhb9dMXhW2WNQGbNLcS0Vzm0";
		StringBuilder urlBuilder = new StringBuilder(
				"http://taas.koroad.or.kr/data/rest/frequentzone/child");
		urlBuilder.append("?" + URLEncoder.encode("authKey", "UTF-8") + "="+ servicekey);
		
		urlBuilder.append("&"+URLEncoder.encode("searchYearCd", "UTF-8")+ "=" + URLEncoder.encode(searchYearCd, "UTF-8"));
		urlBuilder.append("&"+URLEncoder.encode("siDo", "UTF-8")+ "=" + URLEncoder.encode(siDo, "UTF-8"));
		urlBuilder.append("&"+URLEncoder.encode("guGun", "UTF-8")+ "=" + URLEncoder.encode(guGun, "UTF-8"));
		
		URL url = new URL(urlBuilder.toString());
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/json");
		System.out.println("Response code: " + conn.getResponseCode());
		BufferedReader rd;
		if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
			rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		} else {
			rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
		}
		StringBuilder sb = new StringBuilder();
		String line;
		while ((line = rd.readLine()) != null) {
			sb.append(line);
		}
		rd.close();
		conn.disconnect();
		System.out.println(sb.toString());
		JSONObject json = XML.toJSONObject(sb.toString());
		String jsonStr = json.toString();

		return new ResponseEntity<String>(jsonStr, HttpStatus.OK);
		
		
			
	}
}
