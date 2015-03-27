import React from 'react';
import View from 'reapp-ui/views/View';
import Button from 'reapp-ui/components/Button';
import Input from 'reapp-ui/components/Input';
import Superagent from 'superagent';

import iOSTheme from 'reapp-ui/themes/ios/theme'
import Theme from 'reapp-ui/helpers/Theme';

import config from 'flickrkey.config'

// console.dir('flickrkey = ' + config["flickrkey"]);

const key = config["flickrkey"];
const base = `https://api.flickr.com/services/rest/?api_key=${key}&format=rest&format=json&nojsoncallback=1`;

// console.log('base = ' + base);
// console.log('key = ' + key);
//
export default React.createClass({
  getInitialState() {
    return {
      photos: []
    }
  },
  handleSearch() {
   let searchText = this.refs.search.getDOMNode().value;
   Superagent
     .get(`${base}&method=flickr.photos.search&text=${searchText}&per_page=10&page=1`, res => {
       if (res.status === 200 && res.body.photos)
         this.setState({
           photos: res.body.photos.photo.map(this.getFlickrPhotoUrl)
         });
     });
 },
  render() {
    var { photos } = this.state;

    return (
      <Theme {...iOSTheme}>
        <View title="Flickr Search">
          <Input ref="search" placeholder="Enter your search" styles={{
           input: {
             margin: '0 0 10px 0',
             border: '1px solid #ddd'
            }
          }}
          />
          <Button onTap={this.handleSearch}>Search Images</Button>

          <div className="verticalCenter">
            {!photos.length &&
              <p>No photos!</p>
            }
          </div>
        </View>
      </Theme>
    );
  }
});
