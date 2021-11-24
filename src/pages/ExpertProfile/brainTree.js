//   import React, {Component} from 'react';
// import './brainTree.css';
// import 'braintree-web';
// import axios from 'axios';
// import DropIn from 'braintree-web-drop-in-react';

// class App extends Component {
//   instance;

//   state = {
//     clientToken: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSjkuZXlKbGVIQWlPakUxTmprMU1EUTJNekVzSW1wMGFTSTZJamt6TVRWbVl6WTBMVE5sWkRVdE5EbG1OeTFpT0Rsa0xUSmxZalU0TVdRMk56STBOaUlzSW5OMVlpSTZJamxpZVdKeU16TTVaakppY1hBelkzUWlMQ0pwYzNNaU9pSkJkWFJvZVNJc0ltMWxjbU5vWVc1MElqcDdJbkIxWW14cFkxOXBaQ0k2SWpsaWVXSnlNek01WmpKaWNYQXpZM1FpTENKMlpYSnBabmxmWTJGeVpGOWllVjlrWldaaGRXeDBJanBtWVd4elpYMHNJbkpwWjJoMGN5STZXeUp0WVc1aFoyVmZkbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LkN2NlRUNVE0aHpyYmx2YmFRaUpjQnFQUjZWUWxmZExlWHQ1cDg1cHI3dUhKLTNYYTktdUlnUkhMTGxLY3RWRlV6dFcydVE4WmN3R2lTMjJRNU5nd3ZnIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzlieWJyMzM5ZjJicXAzY3QvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4In0sImNoYWxsZW5nZXMiOlsiY3Z2Il0sImVudmlyb25tZW50Ijoic2FuZGJveCIsImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy85YnlicjMzOWYyYnFwM2N0L2NsaWVudF9hcGkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tLzlieWJyMzM5ZjJicXAzY3QifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWt0aXZlbHkiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJuYWlsIiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn0sIm1lcmNoYW50SWQiOiI5YnlicjMzOWYyYnFwM2N0IiwidmVubW8iOiJvZmYifQ=='
//   };

//   async componentDidMount() {
//     try {
//       // Get a client token for authorization from your server
//       const response = await axios.get('http://localhost:3000/api/braintree/v1/getToken');
//       const clientToken = response.data.clientToken;

//       this.setState({clientToken});
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async buy() {
//     try {
//       // Send the nonce to your server
//       const {nonce} = await this
//         .instance
//         .requestPaymentMethod();
//       const response = await axios.post('http://localhost:3000/api/braintree/v1/sandbox', {paymentMethodNonce: nonce});
//       console.log(response);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   render() {
//     if (!this.state.clientToken) {
//       return (
//         <div>
//           <h1>Loading...</h1>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <DropIn
//             options={{
//             authorization: this.state.clientToken
//           }}
//             onInstance={instance => (this.instance = instance)}/>
//           <button onClick={this
//             .buy
//             .bind(this)}>Buy</button>
//         </div>
//       );
//     }
//   }
// }

// export default App;