const sql = require("mssql")



let Selectedquake = (data)=>{
    return new Promise((resolve,reject)=>{
        let result = new sql.Request()

        result
        .input("minDate",sql.NVarChar,data.minDate)
        .input("maxDate",sql.NVarChar,data.maxDate)
        .input("minDepth",sql.Float,data.minDepth)
        .input("maxDepth",sql.Float,data.maxDepth)
        .input("minMagnitude",sql.Float,data.minMagnitude)
        .input("maxMagnitude",sql.Float,data.maxMagnitude)
        .input("enlemMin",sql.Float,data.enlemMin)
        .input("enlemMax",sql.Float,data.enlemMax)
        .input("boylamMin",sql.Float,data.boylamMin)
        .input("boylamMax",sql.Float,data.boylamMax)

        .query(`
            select * from [Fayturk].[dbo].[Earthquake] where [Date] > @minDate and [Date] < @maxDate and [Depth] >= @minDepth and [Depth] <= @maxDepth and [Magnitude] >= @minMagnitude and [Magnitude] <= @maxMagnitude 
            and Latitude BETWEEN @enlemMin AND @enlemMax
            and Longitude BETWEEN @boylamMin AND @boylamMax
            
            `).then(response=>{
            resolve(response.recordset)
        }).catch(err=>{
            reject(err)
        })
    }).catch(err=>{
        return err 
    })
}



let Lastquake = ()=>{
    return new Promise((resolve,reject)=>{
        let result = new sql.Request()

        result
     
        .query(`
            SELECT TOP 1 * FROM [Fayturk].[dbo].[Earthquake] ORDER BY [Date] DESC;

            `).then(response=>{
            resolve(response.recordset[0])
        }).catch(err=>{
            reject(err)
        })
    }).catch(err=>{
        return err 
    })
}


let quakeDay = ()=>{
    return new Promise((resolve,reject)=>{


        const now = new Date();
        now.setHours(now.getHours() - 24); 
      
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); 
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
      
        let zaman = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


        let result = new sql.Request()

        result
        .query(`
             select * from [Fayturk].[dbo].[Earthquake] where [Date] >= '${zaman}'
              `).then(response=>{
              
            resolve(response.recordset)
        }).catch(err=>{
            reject(err)
        })
    }).catch(err=>{
        return err 
    })
}



module.exports = {Selectedquake ,quakeDay, Lastquake}