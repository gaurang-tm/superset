/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import prettyMsFormatter from 'pretty-ms';
import prettyMilliseconds from 'pretty-ms';
import NumberFormatter from '../NumberFormatter';

const indianCurrencyFormatter = (num : number, options?: prettyMilliseconds.Options) => {
  if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + 'Cr';
  } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + 'L';
  } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
  } else {
      return num.toFixed(2);
  }
};

export default function createIndianCurrencyFormatter(
  config: {
    description?: string;
    id?: string;
    label?: string;
    multiplier?: number;
  } & prettyMsFormatter.Options = {},
) {
  const { description, id, label, multiplier = 1, ...prettyMsOptions } = config;

  return new NumberFormatter({
    description,
    formatFunc: value => indianCurrencyFormatter(value * multiplier, prettyMsOptions),
    id: id ?? 'duration_format',
    label: label ?? `Duration formatter`,
  });
}
