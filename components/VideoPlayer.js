import React, { PureComponent } from 'react';
import Head from 'next/head';

class VideoPlayer extends PureComponent {

    constructor(props) {
        super(props)
    }
    
    componentDidMount(){
        const { data } = this.props;
        const script = document.createElement("script");
        script.text = `const player = new Playerjs({ id: "playerDiv", file: "${data?.file}", poster: null, autoplay: true, width: '100%', height: '100%', preload:'auto' });`;
        script.async = true;
        const div = document.getElementById('script');
        div.appendChild(script);
    }
    
    render() {
        return (
            <>
                <Head>
                    <script src="/js/player.js"></script>
                </Head>
                <div id="playerDiv"></div>
                <div id="script"></div>
            </>
        )
    }
}


export default VideoPlayer


