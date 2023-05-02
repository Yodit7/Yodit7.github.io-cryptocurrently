// menu toggle
const openMenu = document.querySelector('.btn-nav i');
const dropdownMenu = document.querySelector('.dropdown_menu');

document.querySelector('.btn-nav').addEventListener('click', () => {
  openMenu.classList.toggle('bi-list');
  openMenu.classList.toggle('bi-x');
  dropdownMenu.classList.toggle('show');
});

const navItems = document.querySelectorAll('.links_wrapper a');

navItems.forEach(navItem => {
  navItem.addEventListener('click', () => {
    console.log("here");
    dropdownMenu.classList.remove('show');
  });
});





// CRYPTO COMPARE API KEY
const key = 'd23856ca5089061cc2891a9e6e42913c7510a855dca31e52484699556b2e199f';


// FÜR LANDING PAGE Header Overview -> li api calls
fetch('https://api.coingecko.com/api/v3/global')
  .then(response => response.json())
  .then(data => {
    const marketCap = data.data.total_market_cap.usd;
    const marketCap_cut = (marketCap / 1000000000000).toFixed(2) + ' T';

    const marketCap_percentage_change = data.data.market_cap_change_percentage_24h_usd;
    const marketCap_percentage_change_info = document.getElementById('marketCap_perc_change');
    marketCap_percentage_change_info.innerHTML = marketCap_percentage_change.toFixed(2) + "%";

    // landing page header overview
    const overviewItem_marketCap = document.getElementById('market_cap');
    overviewItem_marketCap.innerText = `$` + marketCap.toLocaleString();
  
    const get_total_volume = data.data.total_volume.usd;
    const total_volume = document.getElementById('total_volume');
    total_volume.innerHTML = `$` + get_total_volume.toLocaleString();

    // landing page header info 
    const marketCap_info = document.getElementById('market_cap_info');
    marketCap_info.innerHTML = marketCap_cut + " $";
  })
  .catch(error => console.error(error));
  


// MARKET
// ANZAHL DER COINS 
fetch('https://api.coingecko.com/api/v3/coins/list')
  .then(response => response.json())
  .then(data => {
    const numberOfCoins = data.length;
    const getNumOfCoins = document.getElementById('numOfCoins');
    getNumOfCoins.innerHTML = numberOfCoins.toLocaleString();
    console.log(getNumOfCoins);
  })
  .catch(error => {
    console.error('Error retrieving coin list:', error);
  });





// NEWS FEED
// latest news article
const url_news = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN';
const params_news = {
    api_key: key
};

fetch(`${url_news}&${new URLSearchParams(params_news)}`)
  .then(response => {
      if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    const firstArticle = data.Data[0];
    const sndArticle = data.Data[1];
    const thirdArticle = data.Data[2];

   
    // news article title 
    document.getElementById("news_article_first").innerHTML = JSON.stringify(firstArticle.title);
    document.getElementById("news_article_snd").innerHTML = JSON.stringify(sndArticle.title);
    document.getElementById("news_article_third").innerHTML = JSON.stringify(thirdArticle.title);
    
    // news article brief content
    document.getElementById("news_article_content_first").innerHTML = firstArticle.body;
    document.getElementById("news_article_content_snd").innerHTML = sndArticle.body;
    document.getElementById("news_article_content_third").innerHTML = thirdArticle.body;

    // news article url
    const link_first = document.getElementById("news_article_link_first");
    link_first.innerHTML = firstArticle.url;
    link_first.setAttribute('href', firstArticle.url);
    
    const link_snd = document.getElementById("news_article_link_snd");
    link_snd.innerHTML = sndArticle.url;

    const link_third = document.getElementById("news_article_link_third");
    link_third.innerHTML = thirdArticle.url;
    })
  .catch(error => {
      console.error('Error:', error); 
    });
    




// MARKET SHOW 10 PER PAGE




function fetchData() {
  const apiUrl = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD';
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Loop through the coin data and populate the table with the coin names
      const coinList = document.getElementById('coin_list');
      
      // 10 coins per page
      const coinsPerPage = 10;
      // anzahl der buttons -> numberOfCoins/coinsPerPage
      let allCoins = 10000;
      let numOfBtns = allCoins / coinsPerPage;
  
      let startIndex = 0;
      let endIndex = 10;
      
      console.log(data.Data.slice(startIndex,endIndex));
  
      data.Data.slice(startIndex, endIndex).forEach(coin => {
        const name = coin.CoinInfo.FullName;
        const symbol = coin.CoinInfo.Name;
        const price = coin.DISPLAY.USD.PRICE;
        
        const oneHourChange = coin.DISPLAY.USD.CHANGEPCTHOUR;
        const oneHourColor = oneHourChange < 0 ? 'red' : 'green';
        const iChange_one = oneHourChange < 0 ? 'bi bi-caret-down-fill' : 'bi bi-caret-up-fill';
  
        
        const twentyFourChange = coin.DISPLAY.USD.CHANGEPCTDAY;
        const twentyFourColor = twentyFourChange < 0 ? 'red' : 'green';
        const iChange_tF = twentyFourChange < 0 ? 'bi bi-caret-down-fill' : 'bi bi-caret-up-fill';
        
        const marketCap = coin.DISPLAY.USD.MKTCAP;
        const circulationgSupply = coin.DISPLAY.USD.CIRCULATINGSUPPLY;
  
        // icon
        const iconURL = "https://www.cryptocompare.com" + coin.CoinInfo.ImageUrl;
  
        
        const row = `<tr>
                        <td class="currency" style="text-align: left;">
                          <i class="bi bi-star" style="font-weight: 100;"></i>
                          <img src="${iconURL}" style="height: 24px;"> 
                          ${name} <span style="font-weight: 100;">(${symbol})</span>
                        </td>
                        <td class="price" style="text-align: right; font-weight: 800; width: 100px;">
                          ${price}
                          </td>
                        <td style="text-align: right; font-weight: 800;  width: 100px; color: ${oneHourColor};" class="oneHourPercentage">
                          <i class="${iChange_one}"></i> 
                          ${oneHourChange}
                        </td>
                        <td style="text-align: right; font-weight: 800;  width: 100px; color: ${twentyFourColor}">
                          <i class="${iChange_tF}"></i>
                          ${twentyFourChange}
                        </td>
                        <td style="text-align: right; font-weight: 800;  width: 100px;">
                          ${marketCap}
                        </td>
                        <td style="text-align: right; font-weight: 800;  width: 150px; padding-right: 20px;">
                          ${circulationgSupply}
                        </td>
                    </tr>`;
        coinList.innerHTML += row;
      })
    })
    .catch(error => {
      console.error('Error:', error); 
    });
}
  
fetchData();

let button = document.getElementsByClassName("page-btn");

let currentValue = 1;

function activeLink(){
  for(btn of button){
    btn.classList.remove("active");
  }
}



// CRYPTO ABC
const letter_a_d = document.getElementById('btn_letters_a_d');
const letter_e_h = document.getElementById('btn_letters_e_h');
const letter_i_l = document.getElementById('btn_letters_i_l');
const letter_m_p = document.getElementById('btn_letters_m_p');
const letter_q_t = document.getElementById('btn_letters_q_t');
const letter_u_w = document.getElementById('btn_letters_u_w');
const letter_x_z = document.getElementById('btn_letters_x_z');

const letter_a = document.querySelector('.crypto_abc_desc .letters_a_d');
const letter_e = document.querySelector('.crypto_abc_desc .letters_e_h');
const letter_i = document.querySelector('.crypto_abc_desc .letters_i_l');
const letter_m = document.querySelector('.crypto_abc_desc .letter_m_p');
const letter_q = document.querySelector('.crypto_abc_desc .letters_q_t');
const letter_u = document.querySelector('.crypto_abc_desc .letters_u_w');
const letter_x = document.querySelector('.crypto_abc_desc .letters_x_z');

letter_a_d.addEventListener('click', () => {
  letter_a.classList.remove('letters_hidden');

  letter_e.classList.add('letters_hidden');
  letter_i.classList.add('letters_hidden');
  letter_m.classList.add('letters_hidden');
  letter_q.classList.add('letters_hidden');
  letter_u.classList.add('letters_hidden');
  letter_x.classList.add('letters_hidden');

});

letter_e_h.addEventListener('click', () => {
  letter_e.classList.remove('letters_hidden');

  letter_a.classList.add('letters_hidden');
  letter_i.classList.add('letters_hidden');
  letter_m.classList.add('letters_hidden');
  letter_q.classList.add('letters_hidden');
  letter_u.classList.add('letters_hidden');
  letter_x.classList.add('letters_hidden');
});

letter_i_l.addEventListener('click', () => {
  letter_i.classList.remove('letters_hidden');

  letter_a.classList.add('letters_hidden');
  letter_e.classList.add('letters_hidden');
  letter_m.classList.add('letters_hidden');
  letter_q.classList.add('letters_hidden');
  letter_u.classList.add('letters_hidden');
  letter_x.classList.add('letters_hidden');
});

letter_m_p.addEventListener('click', () => {
  letter_m.classList.remove('letters_hidden');

  letter_a.classList.add('letters_hidden');
  letter_e.classList.add('letters_hidden');
  letter_i.classList.add('letters_hidden');
  letter_q.classList.add('letters_hidden');
  letter_u.classList.add('letters_hidden');
  letter_x.classList.add('letters_hidden');
});

letter_q_t.addEventListener('click', () => {
  letter_q.classList.remove('letters_hidden');

  letter_a.classList.add('letters_hidden');
  letter_e.classList.add('letters_hidden');
  letter_i.classList.add('letters_hidden');
  letter_m.classList.add('letters_hidden');
  letter_u.classList.add('letters_hidden');
  letter_x.classList.add('letters_hidden');
});

letter_u_w.addEventListener('click', () => {
  letter_u.classList.remove('letters_hidden');

  letter_a.classList.add('letters_hidden');
  letter_e.classList.add('letters_hidden');
  letter_i.classList.add('letters_hidden');
  letter_m.classList.add('letters_hidden');
  letter_q.classList.add('letters_hidden');
  letter_x.classList.add('letters_hidden');
});

letter_x_z.addEventListener('click', () => {
  letter_x.classList.remove('letters_hidden');

  letter_a.classList.add('letters_hidden');
  letter_e.classList.add('letters_hidden');
  letter_i.classList.add('letters_hidden');
  letter_m.classList.add('letters_hidden');
  letter_q.classList.add('letters_hidden');
  letter_u.classList.add('letters_hidden');
});



