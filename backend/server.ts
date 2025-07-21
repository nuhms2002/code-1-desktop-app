import * as express from 'express';
import {createClient} from '@supabase/supabase-js';
import  * as dotenv from 'dotenv';
import * as path from 'path';

//gives access to env files to use api keys
dotenv.config({path: path.resolve(__dirname, '../../.env')});
//sets up express instance for server
const server = express();
server.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
)


server.listen(5000, () => {
    console.log ("backend running on port 5000");
})

server.get('/get-jobs', async (req, res) => {
    const {data, error} = await supabase
    .from('code1voucher') 
    .select('*');
    console.log('Supabase data:', data, 'Error:', error);
    if (error) {
        return res.status(500).json ({error});
    }

    res.json({jobs: data})

});   

server.post('/add-jobs', async (req, res) => {
    console.log("request body", req.body);
    const JobData = req.body

    //filter out empty string entries and replaces it with null value so empty values can be passed for jobs
    const cleanJobData = Object.fromEntries(
        Object.entries(JobData).map(([key, value]) => [key, value === '' ? null: value]
    )
    )

    JobData.entries(

    )
    const {data, error} = await supabase
    .from('code1voucher')
    .insert([cleanJobData])
    .select();

    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to insert job"});
    }
    res.json ({success: true, job: data[0] });
});

server.post('/remove-jobs', async (req, res) => {
    console.log('Remove job request received:', req.body);
    const jobID = req.body.id;
    console.log('Job ID to remove:', jobID);
    
    const {data, error} = await supabase
    .from('code1voucher')
    .delete()
    .eq('id', jobID);

    console.log('Supabase delete result:', { data, error });

    if (error) {
        console.error('Error removing job:', error);
        return res.status(500).json({ success: false, error: "Failed to remove job" });
    }

    console.log('Job removed successfully, sending response');
    res.json({ success: true, message: "Job removed successfully" });
})