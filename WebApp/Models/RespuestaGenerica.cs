// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-29-2021
// ***********************************************************************
// <copyright file="RespuestaGenerica.cs" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace WebApp.Models
{
	/// <summary>
	/// Class RespuestaGenerica.
	/// </summary>
	public class RespuestaGenerica
    {
		/// <summary>
		/// Gets or sets a value indicating whether this <see cref="RespuestaGenerica"/> is exitoso.
		/// </summary>
		/// <value><c>true</c> if exitoso; otherwise, <c>false</c>.</value>
		public bool Exitoso { get; set; }
		/// <summary>
		/// Gets or sets the error.
		/// </summary>
		/// <value>The error.</value>
		public string Error { get; set; }
		/// <summary>
		/// Gets or sets the entidad.
		/// </summary>
		/// <value>The entidad.</value>
		public object Entidad { get; set; }
		/// <summary>
		/// Gets or sets the total.
		/// </summary>
		/// <value>The total.</value>
		public int Total { get; set; }
    }

}