// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-29-2021
// ***********************************************************************
// <copyright file="ServiceHelper.cs" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace WebApp.Helpers
{
	/// <summary>
	/// Class ServiceHelper.
	/// </summary>
	public static class ServiceHelper
	{
		/// <summary>
		/// Gets the information.
		/// </summary>
		/// <param name="serviceUrl">The service URL.</param>
		/// <param name="serviceName">Name of the service.</param>
		/// <returns>Task&lt;System.String&gt;.</returns>
		public static async Task<string> GetInfo(string serviceUrl, string serviceName)
		{
			string uri = serviceUrl + serviceName;

			using (var client = new HttpClient())
			{
				var content = await client.GetStringAsync(uri);
				return await Task.Run(() => content);
			}
		}

		/// <summary>
		/// Gets the informacion.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="serviceUrl">The service URL.</param>
		/// <param name="serviceName">Name of the service.</param>
		/// <returns>Task&lt;T&gt;.</returns>
		public static async Task<T> GetInformacion<T>(string serviceUrl, string serviceName)
		{
			string uri = serviceUrl + serviceName;

			using (var client = new HttpClient())
			{
				var content = await client.GetStringAsync(uri);
				return await Task.Run(() => JsonSerializer.Deserialize<T>(content));
			}
		}

		/// <summary>
		/// Gets the information.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <typeparam name="T1">The type of the t1.</typeparam>
		/// <param name="url">The URL.</param>
		/// <param name="serviceName">Name of the service.</param>
		/// <returns>Task&lt;T&gt;.</returns>
		public static async Task<T> GetInfo<T, T1>(string url, string serviceName)
		{
			string uri = url + serviceName;

			using (var client = new HttpClient())
			{
				var content = await client.GetStringAsync(uri);
				return await Task.Run(() => JsonSerializer.Deserialize<T>(content));
			}
		}

		/// <summary>
		/// Gets the information.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="serviceUrl">The service URL.</param>
		/// <param name="serviceName">Name of the service.</param>
		/// <returns>Task&lt;List&lt;T&gt;&gt;.</returns>
		public static async Task<List<T>> GetInfo<T>(string serviceUrl, string serviceName)
		{
			string uri = serviceUrl + serviceName;

			using (var client = new HttpClient())
			{
				var content = await client.GetStringAsync(uri);
				return await Task.Run(() => JsonSerializer.Deserialize<List<T>>(content));
			}
		}

		/// <summary>
		/// Gets the resultado resource generica.
		/// </summary>
		/// <typeparam name="T1">The type of the t1.</typeparam>
		/// <param name="serviceUrl">The service URL.</param>
		/// <param name="serviceName">Name of the service.</param>
		/// <returns>Task&lt;T1&gt;.</returns>
		public static async Task<T1> GetResultadoResGenerica<T1>(string serviceUrl, string serviceName)
		{
			string uri = serviceUrl + serviceName;

			using (var client = new HttpClient())
			{
				var content = await client.GetStringAsync(uri);
				return await Task.Run(() => JsonSerializer.Deserialize<T1>(content));
			}
		}

		/// <summary>
		/// Gets the information.
		/// </summary>
		/// <typeparam name="T1">The type of the t1.</typeparam>
		/// <typeparam name="T2">The type of the t2.</typeparam>
		/// <param name="serviceUrl">The service URL.</param>
		/// <param name="serviceName">Name of the service.</param>
		/// <param name="content">The content.</param>
		/// <returns>Task&lt;T1&gt;.</returns>
		public static async Task<T1> GetInfo<T1, T2>(string serviceUrl, string serviceName, T2 content)
		{
			string uri = serviceUrl + serviceName;
			HttpContent httpContent = CreateHttpContent(content);

			using (var client = new HttpClient())
			{
				var request = new HttpRequestMessage(HttpMethod.Get, uri);
				request.Content = httpContent;
				request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
				var result = client.SendAsync(request).Result;
				result.EnsureSuccessStatusCode();
				string response = result.Content.ReadAsStringAsync().Result;
				return await Task.Run(() => JsonSerializer.Deserialize<T1>(response));
			}
		}

		/// <summary>
		/// Posts the information.
		/// </summary>
		/// <typeparam name="T1">The type of the t1.</typeparam>
		/// <typeparam name="T2">The type of the t2.</typeparam>
		/// <param name="serviceUrl">The service URL.</param>
		/// <param name="serviceName">Name of the service.</param>
		/// <param name="content">The content.</param>
		/// <returns>Task&lt;T1&gt;.</returns>
		public static async Task<T1> PostInfo<T1, T2>(string serviceUrl, string serviceName, T2 content)
		{
			string uri = serviceUrl + serviceName;
			HttpContent httpContent = CreateHttpContent(content);

			using (var client = new HttpClient())
			{
				var request = new HttpRequestMessage(HttpMethod.Post, uri);
				request.Content = httpContent;
				request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
				var result = client.SendAsync(request).Result;
				result.EnsureSuccessStatusCode();
				string response = result.Content.ReadAsStringAsync().Result;
				return await Task.Run(() => JsonSerializer.Deserialize<T1>(response));
			}
		}



		/// <summary>
		/// Creates the content of the HTTP.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="content">The content.</param>
		/// <returns>HttpContent.</returns>
		private static HttpContent CreateHttpContent<T>(T content)
		{
			var json = JsonSerializer.Serialize(content);
			return new StringContent(json, Encoding.UTF8, "application/json");
		}
		
	}
}