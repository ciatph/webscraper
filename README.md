# webscraper
A JS Web scraper that extracts species names from [http://www.iucnredlist.org/search](http://www.iucnredlist.org/search) into a comma-separated text file.

## Usage

### Web Browser

The remote resource _iucnredlist.org_ currently does not support Cross-Origin Resource Sharing (CORS) which you can read more about [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) and [here](https://www.html5rocks.com/en/tutorials/cors/) so be sure to use a web browser that allows CORS.
<br><br>
For development purposes, the recommended browser to use is the Google Chrome web browser with `--disable-security-flags`. See instructions below on how to disable Chrome security for windows.

### HTTP Server
Host this project folder and/or its contents on an _http_ web server. 


### User Input
1. Enter a starting (**From**) and ending (**To**) page range indices on which to scrape data. Maximum page is currently set to 35.

2. Press the **Scrape** button to start fetching data. Press the **Stop** button anytime to stop.

3. Once the scraping process has finished stopping, press the **Download** button to download the species names list in a comma-separated text file.

4. Press the **Reset** button to restart.

<br>

## Disable Security in Chrome

Type the following in a windows commandline:

>rem rem stands for remark/comments<br>
rem Kill all chrome process<br>
taskkill /F /IM chrome.exe <br>
start chrome --disable-web-security --user-data-dir

<br>
# WARNING!

Once chrome has been re-started with disable flags, it will always run with disabled security unless you re-start it again in a normal manner. It is dangerous to continue using Chrome with disabled security, so be sure to reset it to its original settings.

Type the following in the windows command line:

>rem rem stands for remark/comments<br>
rem Kill all chrome process<br>
taskkill /F /IM chrome.exe<br>

Then you can start using chrome normally again.


<br>
Date created: 20180518<br>
Date Modified: 20180521