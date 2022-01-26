// Code File(Amnpardaz Software Co. Copyright 2020 - All Right Reserved)
// Release Ferdos.ProductImplementer 1.0.0.0
using System;
using System.Data.SqlClient;
using System.IO;
using System.Web;

public class SqlDataProvider
    {
        public static SqlConnection DbConnection
        {
            get
            {
                return new SqlConnection(@"Data Source=.;Initial Catalog=FS_Software;User ID=sa;Password=P@ssw0rd;MultipleActiveResultSets=true");
            }
        }

        public static SqlConnection SDbConnection
        {
            get
            {
                return new SqlConnection(@"Data Source=.;Initial Catalog=FS_Server;User ID=sa;Password=P@ssw0rd;MultipleActiveResultSets=true");
            }
        }

        #region Static Methods

        public static object ExecuteScalarQuery(string query)
        {
            object result = null;

            using (var connection = DbConnection)
            {
                try
                {
                    connection.Open();
                }
                catch (Exception exp)
                {
                    throw exp;
                }

                try
                {
                    using (var command = new SqlCommand(query, connection))
                    {
                        result = Convert.ToString(command.ExecuteScalar());
                    }
                }
                catch (Exception exp)
                {
                    throw exp;
                }

                return result;
            }
        }

        public static void ExecuteNoneQuery(string query)
        {
            using (var connection = DbConnection)
            {
                try
                {
                    connection.Open();
                }
                catch (Exception exp)
                {
                    throw exp;
                }

                try
                {
                    using (var command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
                catch (Exception exp)
                {
                StreamWriter x = File.CreateText(HttpContext.Current.Server.MapPath("/App_Data") + "/errr.txt");
                x.Write(exp.Message);
                x.Write(query);
                x.Close();

                throw exp;

                }
            }
        }

        public static object SExecuteScalarQuery(string query)
        {
            object result = null;

            using (var connection = SDbConnection)
            {
                try
                {
                    connection.Open();
                }
                catch (Exception exp)
                {

                    throw exp;
                }

                try
                {
                    using (var command = new SqlCommand(query, connection))
                    {
                        result = Convert.ToString(command.ExecuteScalar());
                    }
                }
                catch (Exception exp)
                {
                    throw exp;
                }

                return result;
            }
        }

        public static void SExecuteNoneQuery(string query)
        {
            using (var connection = SDbConnection)
            {
                try
                {
                    connection.Open();
                }
                catch (Exception exp)
                {
                    throw exp;
                }

                try
                {
                    using (var command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
                catch (Exception exp)
                {
                    throw exp;

                }
            }
        }

        public static void ExecuteBatchNonQuery(string query)
        {
            string sqlBatch = string.Empty;

            using (var connection = DbConnection)
            {
                try
                {
                    connection.Open();
                }
                catch (Exception exp)
                {
                    throw exp;
                }

                using (SqlCommand cmd = new SqlCommand(string.Empty, connection))
                {
                    query += "\nGO";   // make sure last batch is executed.
                    try
                    {
                        foreach (string line in query.Split(new string[2] { "\n", "\r" }, StringSplitOptions.RemoveEmptyEntries))
                        {
                            if (line.ToUpperInvariant().Trim() == "GO")
                            {
                                cmd.CommandText = sqlBatch;
                                cmd.ExecuteNonQuery();
                                sqlBatch = string.Empty;
                            }
                            else
                            {
                                sqlBatch += line + "\n";
                            }
                        }
                    }
                    catch (Exception exp)
                    {
                        throw exp;
                    }
                }
            }
        }

        #endregion

    }
