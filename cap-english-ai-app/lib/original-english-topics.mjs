// Author-created scenario briefs; no exam text is used as input.
const rows=`Radio Rescue|science room|repair small radios|keep useful things out of the trash|radios
Seed Library|school garden|share vegetable seeds|help neighbors grow their own food|seed packets
Quiet Maps|town library|draw maps of quiet places|help readers find a peaceful seat|maps
Rain Collectors|garden shed|measure collected rainwater|learn how much water a garden needs|measuring cups
Story Benches|community park|record stories about old benches|help visitors learn local history|recorders
Bike Lights|bicycle workshop|check bicycle lights|make evening rides safer|lights
Lunch Choices|school kitchen|compare healthy lunch plans|help students choose balanced meals|menus
River Watch|river center|count birds near the river|notice changes in the local environment|notebooks
Toy Hospital|activity room|fix wooden toys|give old toys a second life|tools
Walking Routes|town hall|plan safe walking routes|help younger children get to school|route cards
Plant Labels|greenhouse|make labels for local plants|help visitors recognize common plants|labels
Shared Umbrellas|station office|organize umbrellas for visitors|help people travel on rainy days|umbrellas
Sound Museum|music room|collect sounds from daily life|show how familiar places sound different|microphones
Food Stories|community kitchen|write stories about family dishes|help families share their traditions|recipe cards
Warm Windows|art room|design paper window decorations|make an empty room more welcoming|paper sheets
Repair Records|workshop|keep records of simple repairs|help others solve the same problems|record cards
Pocket Gardens|roof garden|grow herbs in small boxes|show that gardening needs little space|plant boxes
Night Readers|reading room|make reading lights from reused parts|help readers save electricity|lamp parts
Bus Helpers|visitor center|explain local bus routes|help new visitors travel without cars|bus maps
Friendly Signs|sports center|rewrite confusing signs|help first-time visitors find their way|sign boards
Bread Notes|bakery classroom|compare bread-making methods|learn why careful measurements matter|mixing bowls
Bird Shelters|woodwork room|build small bird shelters|provide safe places away from busy roads|wood pieces
Lake Letters|nature classroom|write letters about a lake|encourage people to protect clean water|postcards
Clothing Exchange|school hall|sort clothes for an exchange|help families reuse good clothing|clothes racks
Memory Boxes|history room|prepare boxes of family memories|help different generations share experiences|storage boxes
Clear Instructions|computer room|test instructions for simple tasks|make school guides easier to understand|instruction cards
Shade Study|school yard|compare shade at different times|find cooler places for outdoor breaks|thermometers
Puzzle Club|club room|design puzzles for younger students|make problem solving enjoyable|puzzle cards
Travel Diaries|language room|share diaries about short trips|show what travelers can learn nearby|diaries
Bottle Stations|main hallway|check drinking-water stations|help students use fewer plastic bottles|water bottles
Community Clocks|clock workshop|restore old wall clocks|help neighbors keep objects they value|clock parts
Market Guides|market office|make guides to local stalls|help shoppers find fresh seasonal food|guide sheets
Small Stages|drama room|build a stage for short plays|give shy students a chance to speak|stage blocks
Street Trees|park office|measure trees beside the street|learn which trees give the most shade|measuring tapes
Helpful Buttons|design room|test buttons on simple machines|make tools easier for older people to use|sample boards
Reading Bags|library corner|pack books for home visits|bring stories to people who cannot travel|book bags
Weather Friends|weather station|compare daily weather reports|learn when a forecast can change|weather charts
Color Paths|gallery room|design clear paths through an exhibition|help visitors see displays in order|color cards
Kitchen Scales|cooking room|check the weight of ingredients|reduce mistakes when following a recipe|scales
Mini Bridges|engineering room|build model bridges from paper|explore how shape affects strength|paper strips
Water Stories|river museum|interview people about water use|learn how daily habits have changed|question sheets
Bee Corners|flower garden|make resting places for bees|support small animals in the city|flower pots
Photo Descriptions|media room|write descriptions for local photographs|help people understand a picture without seeing it|photo cards
Clean Trails|hill center|make trail-care plans|keep walking paths clean and safe|trail maps
Fair Games|playground office|test rules for team games|give every player a fair chance|rule cards
Lunch Containers|recycling room|compare reusable lunch containers|find ways to reduce daily packaging|containers
Town Models|model room|build a model of the neighborhood|help visitors understand local streets|model houses
Family Podcasts|recording room|record short family interviews|help children listen to different life stories|headphones
Plant Doctors|garden classroom|observe plants with damaged leaves|learn which changes help plants recover|plant trays
Accessible Trips|travel classroom|plan trips with fewer stairs|help more people enjoy local places|trip plans
Paper Lab|craft room|make paper from used notebooks|understand how materials can be reused|paper screens
Solar Study|energy room|compare small solar panels|learn how light affects energy production|solar panels
Lost Items|student office|improve the lost-item service|help students find things more quickly|item tags
Festival Team|festival office|plan a low-waste school festival|make a busy event easier to manage|planning sheets
Book Covers|illustration room|design covers for student stories|help readers choose a story that interests them|cover designs
Fresh Air|health classroom|compare air in different rooms|learn why fresh air matters during study|air monitors`;
export const englishTopics=rows.split('\n').map((line,i)=>{const [title,venue,action,goal,items]=line.split('|');return {id:i+1,title,venue,action,goal,items};});
