# Enhanced Flex Queues Dashboard

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).


## How it works

This plugin contains a set of enhancements for the Real-Time Queues View.

### Queue Stats Dashboard
- Filter Queues View by Agent's team_name attribute
- Manual filter to only display a "group" of queues (based on partial queue name match).
- Selectively remove a metric (waiting-tasks) based on the Queue Name
- Add Titles with Active/Waiting tasks aggregated for a set of queues (using Queue Name)  
- Add tiles with metrics aggregated by Channel

The Flex [Real-Time Queues View](https://www.twilio.com/docs/flex/end-user-guide/insights/real-time-queues-view) displays all queues unless you set a [filter](https://www.twilio.com/docs/flex/developer/ui/queues-view-programmability#setfilter) that hides or displays only some queues.

The [Queues Data Table](https://www.twilio.com/docs/flex/developer/ui/queues-view-programmability#modify-the-queuesdatatable) can be modifed by removing and (re)adding columns with metrics.

The Flex reference docs contain a listing of all [properties for each WorkerQueue](https://assets.flex.twilio.com/docs/releases/flex-ui/1.30.2/QueuesStats%25E2%2580%25A4QueuesDataTable.html#.QueuesStats%E2%80%A4WorkerQueue) in the QueueStats data set. 

Additional [DataTiles](https://www.twilio.com/docs/flex/developer/ui/queues-view-programmability#add-or-remove-individual-data-tiles) can be added to display custom metrics/KPIs.  As you can see from this example in our docs, you can connect your custom data tile to the Flex Redux store using [connect](https://react-redux.js.org/api/connect) from React-Redux. You need to provide the equivalent of a “mapStateToProps” function and return an object with props. The available Queue Stats data in Redux is documented in the [Flex Reference docs](https://assets.flex.twilio.com/docs/releases/flex-ui/1.30.2/QueuesStats%25E2%2580%25A4QueuesDataTable.html#.QueuesStats%E2%80%A4WorkerQueue) except it’s missing the Channels child object which gives you the break-down by channel (chat/voice).



The example in our docs shows how to populate the `content` prop of the AggregatedDataTile but it also has a `description` label which can be used for either static text or another metric value. In this example both the Active and Waiting tasks are shown in the same Tile with the Waiting tasks value in the Description line. Using the Channels child object (per queue) you can aggregate the data by channel to display the total Active Chats & Calls and calculate the SLA % per channel. Color coding can be applied to enhance the UI for Supervisors.

<img width="800px" src="images/queueStatsChannelSLATiles.png"/>


# Configuration

## Requirements

To deploy this plugin, you will need:

- An active Twilio account with Flex provisioned. Refer to the [Flex Quickstart](https://www.twilio.com/docs/flex/quickstart/flex-basics#sign-up-for-or-sign-in-to-twilio-and-create-a-new-flex-project%22) to create one.
- npm version 5.0.0 or later installed (type `npm -v` in your terminal to check)
- Node.js version 12 or later installed (type `node -v` in your terminal to check). We recommend the _even_ versions of Node.
- [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli) along with the [Flex CLI Plugin](https://www.twilio.com/docs/twilio-cli/plugins#available-plugins) and the [Serverless Plugin](https://www.twilio.com/docs/twilio-cli/plugins#available-plugins). Run the following commands to install them:

```
# Install the Twilio CLI
npm install twilio-cli -g
# Install the Serverless and Flex as Plugins
twilio plugins:install @twilio-labs/plugin-serverless
twilio plugins:install @twilio-labs/plugin-flex
```

## Setup

Install the dependencies by running `npm install`:

```bash
cd plugin-dashboards
npm install
cd ../dashboard-service
npm install
```
From the root directory, rename `public/appConfig.example.js` to `public/appConfig.js`.

```bash
mv public/appConfig.example.js public/appConfig.js
```


## Flex Plugin

### Development

Create the plugin config file by copying `.env.example` to `.env`.

```bash
cd plugin-dashboards
cp .env.example .env
```

Edit `.env` and set the `FLEX_APP_FUNCTIONS_BASE` variable to your Twilio Functions base URL (like https://dashboard-service-xxxx-dev.twil.io). 

To run the plugin locally, you can use the Twilio Flex CLI plugin. Using your command line, run the following from the root directory of the plugin.

```bash
cd plugin-dashboards
twilio flex:plugins:start
```

This will automatically start up the webpack dev server and open the browser for you. Your app will run on `http://localhost:3000`.

When you make changes to your code, the browser window will be automatically refreshed.


### Deploy your Flex Plugin

Once you are happy with your Flex plugin, you have to deploy then release it on your Flex application.

Run the following command to start the deployment:

```bash
twilio flex:plugins:deploy --major --changelog "Releasing Dashboards plugin" --description "Dashboards plugin"
```

After running the suggested next step, navigate to the [Plugins Dashboard](https://flex.twilio.com/admin/) to review your recently deployed plugin and confirm that it’s enabled for your contact center.

**Note:** Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.

You are all set to test this plugin on your Flex application!

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.




